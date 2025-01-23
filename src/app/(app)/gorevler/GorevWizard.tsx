"use client";

import React, { useState, useEffect } from "react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { useFindingStore } from "@/store/useFindingStore";
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
import { Separator } from "@/components/ui/separator";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

/** Suppose the user is "Ayşe" or from a real auth. */
const currentWorkerName = "Ayşe";

interface GorevWizardProps {
  checklistId: string;
  onClose: () => void;
}

export default function GorevWizard({
  checklistId,
  onClose,
}: GorevWizardProps) {
  const {
    checklists,
    toggleItem,
    addComment,
    addPhoto,
    removePhoto,
    finishChecklist,
  } = useChecklistStore();

  const { toast } = useToast();
  const findingStore = useFindingStore.getState(); // direct access or via getState()

  const checklist = checklists.find((cl) => cl.id === checklistId);

  if (!checklist) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <p className="text-center">Görev bulunamadı.</p>
            <Button onClick={onClose} className="mt-4 w-full">
              Kapat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (checklist.completed) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <p className="text-center">Görev zaten tamamlandı.</p>
            <Button onClick={onClose} className="mt-4 w-full">
              Kapat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [localComment, setLocalComment] = useState("");
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  useEffect(() => {
    if (currentIndex >= checklist.items.length) {
      setCurrentIndex(0);
    }
  }, [checklist.items.length, currentIndex]);

  const currentItem = checklist.items[currentIndex];

  // Reset time to 10 minutes whenever we move to a new item
  useEffect(() => {
    setTimeLeft(600);
  }, [currentIndex]);

  // Decrement the timer every second, unless item is checked or checklist completed
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentItem.checked || checklist.completed) return;
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentItem.checked, checklist.completed]);

  // Sync localComment to the current item’s existing comment
  useEffect(() => {
    setLocalComment(currentItem.comment || "");
  }, [currentItem]);

  // Format the timer (mm:ss) with negative sign if below zero
  const absTime = Math.abs(timeLeft);
  const minutes = Math.floor(absTime / 60);
  const seconds = absTime % 60;
  const sign = timeLeft < 0 ? "-" : "";
  const formattedTime = `${sign}${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  /** Toggles the item’s checkbox status */
  function handleToggle() {
    toggleItem(checklistId, currentItem.id);
  }

  /** Saves the localComment back to the store */
  function handleSaveComment() {
    addComment(checklistId, currentItem.id, localComment);
    toast({
      title: "Yorum Eklendi",
      description: "Yorum başarıyla kaydedildi.",
      duration: 3000,
    });
  }

  /** Photo upload -> store in checklist item */
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result;
        if (typeof base64 === "string") {
          addPhoto(checklistId, currentItem.id, base64);
          toast({
            title: "Fotoğraf Yüklendi",
            description: "Fotoğraf başarıyla yüklendi.",
            duration: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    });
  }

  /** Remove a photo from item */
  function handleRemovePhoto(index: number) {
    removePhoto(checklistId, currentItem.id, index);
    toast({
      title: "Fotoğraf Silindi",
      description: "Fotoğraf kaldırıldı.",
      duration: 3000,
    });
  }

  /** Next/Previous item */
  const isLastItem = currentIndex === checklist.items.length - 1;
  function handleNext() {
    if (checklist && currentIndex < checklist.items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }
  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  /** Mark entire checklist as finished */
  function handleFinishChecklist() {
    finishChecklist(checklistId);
    toast({
      title: "Görev Tamamlandı",
      description: "Görev başarıyla tamamlandı.",
      duration: 3000,
    });
    onClose();
  }

  /** Creates a Bulgu from this item’s data. */
  function handleCreateBulgu() {
    const photos = currentItem.photos || [];
    const comment = currentItem.comment || "";

    if (!comment && photos.length === 0) {
      toast({
        title: "Bulgu Oluşturulamadı",
        description: "Önce bir yorum veya fotoğraf ekleyin.",
        variant: "destructive",
      });
      return;
    }

    findingStore.addFinding({
      type: "Görev",
      status: "Açık",
      location: checklist?.location || "",
      createdAt: new Date().toISOString(),
      comment,
      photos,
      foundBy: currentWorkerName, // <-- set the "Bulan Kişi"
    });

    toast({
      title: "Bulgu Oluşturuldu",
      description: "Bu maddede tespit edilen sorun Bulgular sayfasına eklendi.",
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto min-h-screen">
      <Card className="min-h-screen max-w-3xl mx-auto my-4 flex flex-col border-0 rounded-none sm:rounded-lg sm:my-8">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-card z-10 p-4">
          <CardTitle className="text-lg sm:text-xl">
            {checklist.title}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-grow p-4 sm:p-6">
          <div className="space-y-6">
            {/* Timer display if item not checked */}
            {!currentItem.checked && !checklist.completed && (
              <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                <span className="text-sm font-medium">Kalan Süre:</span>
                <span className="text-lg font-bold">{formattedTime}</span>
              </div>
            )}

            {/* Item label + checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={currentItem.checked}
                onChange={handleToggle}
                disabled={checklist.completed}
                className="w-5 h-5"
              />
              <span
                className={`text-lg ${
                  currentItem.checked
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {currentItem.label}
              </span>
            </div>

            <Separator />

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Yorum</Label>
              <div className="flex items-end gap-2">
                <Input
                  id="comment"
                  value={localComment}
                  onChange={(e) => setLocalComment(e.target.value)}
                  disabled={checklist.completed}
                />
                <Button
                  onClick={handleSaveComment}
                  disabled={checklist.completed}
                  size="sm"
                >
                  Kaydet
                </Button>
              </div>
            </div>

            <Separator />

            {/* Photos */}
            <div className="space-y-2">
              <Label htmlFor="photo-upload">Fotoğraf Yükle</Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                disabled={checklist.completed}
              />
              {currentItem.photos && currentItem.photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {currentItem.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Fotoğraf ${index}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      {!checklist.completed && (
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

            <Separator />

            {/* Button to create a Bulgu */}
            {!checklist.completed && (
              <Button variant="outline" onClick={handleCreateBulgu}>
                Bulgu Oluştur
              </Button>
            )}
          </div>
        </CardContent>

        {/* Footer: Prev/Next/Finish */}
        <CardFooter className="justify-between items-center sticky bottom-0 bg-card z-10 p-4">
          <Button onClick={handlePrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Önceki
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {checklist.items.length}
          </div>

          {isLastItem ? (
            <Button
              variant="destructive"
              onClick={() => setShowFinishConfirm(true)}
            >
              Bitir
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Sonraki
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Finish Confirm */}
      <Dialog open={showFinishConfirm} onOpenChange={setShowFinishConfirm}>
        <DialogContent className="w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Görevi Bitir</DialogTitle>
          </DialogHeader>
          <p>Bu görevi tamamlamak istediğinize emin misiniz?</p>
          <DialogFooter className="justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setShowFinishConfirm(false)}
            >
              Vazgeç
            </Button>
            <Button variant="destructive" onClick={handleFinishChecklist}>
              Bitir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
