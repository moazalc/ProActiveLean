"use client";

import React, { useState, useEffect } from "react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CheckCircle, Clock, MapPin, Calendar, Star, X } from "lucide-react";

// Suppose the worker is Ayşe with ID "2"
const currentWorkerId = "2";

export default function MyChecklistsPage() {
  const {
    checklists,
    toggleItem,
    addComment,
    addPhoto,
    removePhoto,
    finishChecklist,
  } = useChecklistStore();
  const { toast } = useToast();

  // Filter for only checklists assigned to this worker
  const workerChecklists = checklists.filter(
    (cl) => cl.assignedUserId === currentWorkerId
  );

  const handleFinishChecklist = (id: string) => {
    finishChecklist(id);
    toast({
      title: "Checklist Tamamlandı",
      description: "Checklist başarıyla bitirildi.",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Benim Görevlerim</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workerChecklists.map((cl) => (
          <Card key={cl.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{cl.title}</span>
                <Badge variant={cl.completed ? "default" : "secondary"}>
                  {cl.completed ? "Tamamlandı" : "Devam Ediyor"}
                </Badge>
              </CardTitle>
              <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{cl.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {/* Show due date + time if available */}
                  <span>
                    {cl.dueDate} {cl.dueTime && `@ ${cl.dueTime}`}
                  </span>
                </div>
                {cl.score !== undefined && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    <span>Puan: {cl.score}</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {cl.items.map((item) => (
                    <ChecklistItemRow
                      key={item.id}
                      checklistId={cl.id}
                      item={item}
                      disabled={cl.completed} // entire checklist completed -> disable
                      toggleItem={toggleItem}
                      addComment={addComment}
                      addPhoto={addPhoto}
                      removePhoto={removePhoto}
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter>
              {!cl.completed && (
                <Button
                  className="w-full"
                  onClick={() => handleFinishChecklist(cl.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Checklisti Bitir
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {workerChecklists.length === 0 && (
        <Card>
          <CardContent className="text-center py-6">
            <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-lg font-medium">
              Şu anda atanan bir checklist yok.
            </p>
          </CardContent>
        </Card>
      )}

      <Toaster />
    </div>
  );
}

/** Represents a single item row with its 10-minute timer. */
function ChecklistItemRow({
  checklistId,
  item,
  disabled,
  toggleItem,
  addComment,
  addPhoto,
  removePhoto,
}: {
  checklistId: string;
  item: {
    id: string;
    label: string;
    checked: boolean;
    comment?: string;
    photos?: string[];
  };
  disabled: boolean;
  toggleItem: (checklistId: string, itemId: string) => void;
  addComment: (checklistId: string, itemId: string, comment: string) => void;
  addPhoto: (checklistId: string, itemId: string, photo: string) => void;
  removePhoto: (
    checklistId: string,
    itemId: string,
    photoIndex: number
  ) => void;
}) {
  const [localComment, setLocalComment] = useState(item.comment || "");
  const { toast } = useToast();

  // ---- PER-ITEM TIMER LOGIC ----
  // 10 minutes = 600 seconds
  const [timeLeft, setTimeLeft] = useState(600);

  // Decrement timer every second, unless item is disabled or checked
  useEffect(() => {
    const timer = setInterval(() => {
      // If the entire checklist is disabled or the item is checked, freeze the timer
      if (disabled || item.checked) return;
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [disabled, item.checked]);

  // Format the timer
  const absTime = Math.abs(timeLeft);
  const minutes = Math.floor(absTime / 60);
  const seconds = absTime % 60;
  const sign = timeLeft < 0 ? "-" : "";
  const formattedTime = `${sign}${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // For uploading multiple image files as base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result;
        if (typeof base64 === "string") {
          addPhoto(checklistId, item.id, base64);
          toast({
            title: "Fotoğraf Yüklendi",
            description: "Fotoğraf başarıyla yüklendi.",
            duration: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index: number) => {
    removePhoto(checklistId, item.id, index);
    toast({
      title: "Fotoğraf Silindi",
      description: "Fotoğraf kaldırıldı.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-secondary rounded-lg">
      {/* Timer Display (freeze if item.checked or disabled) */}
      {!disabled && !item.checked && (
        <div className="flex items-center justify-between bg-muted p-2 rounded-md">
          <span className="text-sm font-medium">Kalan Süre:</span>
          <span className="text-lg font-bold">{formattedTime}</span>
        </div>
      )}

      {/* Main Row */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => toggleItem(checklistId, item.id)}
          disabled={disabled}
          className="w-5 h-5"
        />
        <span
          className={item.checked ? "line-through text-muted-foreground" : ""}
        >
          {item.label}
        </span>
      </div>

      <Separator />

      {/* Comment */}
      <div className="space-y-2">
        <Label htmlFor={`comment-${item.id}`}>Yorum</Label>
        <div className="flex items-end gap-2">
          <Input
            id={`comment-${item.id}`}
            value={localComment}
            onChange={(e) => setLocalComment(e.target.value)}
            disabled={disabled}
          />
          <Button
            onClick={() => {
              addComment(checklistId, item.id, localComment);
              toast({
                title: "Yorum Eklendi",
                description: "Yorum başarıyla kaydedildi.",
                duration: 3000,
              });
            }}
            disabled={disabled}
            size="sm"
          >
            Kaydet
          </Button>
        </div>
      </div>

      <Separator />

      {/* Photos */}
      <div className="space-y-2">
        <Label htmlFor={`photo-${item.id}`}>Fotoğraf Yükle</Label>
        <Input
          id={`photo-${item.id}`}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          disabled={disabled}
        />

        {/* Render all photos in a grid/list */}
        {item.photos && item.photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Fotoğraf ${index}`}
                  className="max-h-32 rounded-md"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 text-red-500 bg-white rounded-full p-1 shadow"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
