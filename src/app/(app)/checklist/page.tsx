"use client";

import React, { useState } from "react";
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
import { CheckCircle, Clock, MapPin, Calendar, Star } from "lucide-react";

// Suppose the worker is Ayşe with ID "2"
const currentWorkerId = "2";

export default function MyChecklistsPage() {
  const { checklists, toggleItem, addComment, addPhoto, finishChecklist } =
    useChecklistStore();
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
      <h1 className="text-3xl font-bold text-primary">Benim Checklistlerim</h1>
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
                  <span>{cl.dueDate}</span>
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
                      disabled={cl.completed}
                      toggleItem={toggleItem}
                      addComment={addComment}
                      addPhoto={addPhoto}
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

function ChecklistItemRow({
  checklistId,
  item,
  disabled,
  toggleItem,
  addComment,
  addPhoto,
}: {
  checklistId: string;
  item: {
    id: string;
    label: string;
    checked: boolean;
    comment?: string;
    photo?: string;
  };
  disabled: boolean;
  toggleItem: (checklistId: string, itemId: string) => void;
  addComment: (checklistId: string, itemId: string, comment: string) => void;
  addPhoto: (checklistId: string, itemId: string, photo: string) => void;
}) {
  const [localComment, setLocalComment] = useState(item.comment || "");
  const { toast } = useToast();

  // For uploading an image file as base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
  };

  return (
    <div className="space-y-4 p-4 bg-secondary rounded-lg">
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

      {/* Photo */}
      <div className="space-y-2">
        <Label htmlFor={`photo-${item.id}`}>Fotoğraf Yükle</Label>
        <Input
          id={`photo-${item.id}`}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          disabled={disabled}
        />
      </div>
      {item.photo && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Yüklenen Fotoğraf:</p>
          <img
            src={item.photo}
            alt="Uploaded"
            className="max-h-32 rounded-md"
          />
        </div>
      )}
    </div>
  );
}
