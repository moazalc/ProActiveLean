import React, { useState, useEffect } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { useFindingStore } from "@/store/useFindingStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";

/** Suppose the auditor's name is "Denetçi Ali" or from real user data. */
const currentAuditorName = "Ali";

interface AuditQuestionCardProps {
  auditId: string;
  onClose: () => void;
}

export default function AuditQuestionCard({
  auditId,
  onClose,
}: AuditQuestionCardProps) {
  const {
    audits,
    markAnswer,
    markSubQuestionAnswer,
    addCommentToQuestion,
    addPhotoToQuestion,
    removePhotoFromQuestion,
    finishAudit,
  } = useAuditStore();

  const { toast } = useToast();
  const findingStore = useFindingStore.getState();

  const audit = audits.find((a) => a.id === auditId);

  // Current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 10 minute timer
  const [timeLeft, setTimeLeft] = useState(600);

  // Reset timer each question
  useEffect(() => {
    setTimeLeft(600);
  }, [currentQuestionIndex]);

  // Decrement timer if not completed
  useEffect(() => {
    const timer = setInterval(() => {
      if (audit?.completed) return;
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [audit?.completed]);

  const absTime = Math.abs(timeLeft);
  const minutes = Math.floor(absTime / 60);
  const seconds = absTime % 60;
  const sign = timeLeft < 0 ? "-" : "";
  const formattedTime = `${sign}${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  if (!audit) return null;

  const currentQuestion = audit.questions[currentQuestionIndex];
  const isAuditCompleted = audit.completed;

  const handleMarkAnswer = (answer: "YES" | "NO" | "NA") => {
    if (!isAuditCompleted) {
      markAnswer(auditId, currentQuestion.id, answer);
    }
  };

  const handleSubQCheck = (subQId: string, answer: "YES" | "NO" | "NA") => {
    if (!isAuditCompleted) {
      markSubQuestionAnswer(auditId, currentQuestion.id, subQId, answer);
    }
  };

  const handleSaveComment = () => {
    if (!isAuditCompleted) {
      addCommentToQuestion(
        auditId,
        currentQuestion.id,
        currentQuestion.comment || ""
      );
      toast({
        title: "Yorum Kaydedildi",
        description: "Yorum başarıyla eklendi.",
        duration: 3000,
      });
    }
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAuditCompleted) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result;
        if (typeof base64 === "string") {
          addPhotoToQuestion(auditId, currentQuestion.id, base64);
          toast({
            title: "Fotoğraf Eklendi",
            description: "Fotoğraf başarıyla yüklendi.",
            duration: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (photoIndex: number) => {
    if (!isAuditCompleted) {
      removePhotoFromQuestion(auditId, currentQuestion.id, photoIndex);
      toast({
        title: "Fotoğraf Silindi",
        description: "Fotoğraf kaldırıldı.",
        duration: 3000,
      });
    }
  };

  const isLastQuestion = currentQuestionIndex === audit.questions.length - 1;

  function handleFinishAudit() {
    finishAudit(auditId);
    toast({
      title: "Denetim Tamamlandı",
      description: "Denetim başarıyla tamamlandı.",
      duration: 3000,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <Card className="min-h-screen flex flex-col border-0 rounded-none">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10">
          <CardTitle>Denetim Soruları</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-grow">
          <div className="space-y-4 max-w-3xl mx-auto py-4">
            {/* Timer */}
            {!isAuditCompleted && (
              <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                <span className="text-sm font-medium">Kalan Süre:</span>
                <span className="text-lg font-bold">{formattedTime}</span>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Kategori:</span>{" "}
              {currentQuestion.category}
              <span className="font-semibold ml-2">Madde:</span>{" "}
              {currentQuestion.itemLabel}
            </div>

            {/* Main question */}
            <div className="space-y-2">
              <Label className="text-sm">{currentQuestion.text}</Label>
              <div className="flex space-x-2">
                <Button
                  variant={
                    currentQuestion.answer === "YES" ? "default" : "outline"
                  }
                  onClick={() => handleMarkAnswer("YES")}
                  disabled={isAuditCompleted}
                >
                  Evet
                </Button>
                <Button
                  variant={
                    currentQuestion.answer === "NO" ? "default" : "outline"
                  }
                  onClick={() => handleMarkAnswer("NO")}
                  disabled={isAuditCompleted}
                >
                  Hayır
                </Button>
                <Button
                  variant={
                    currentQuestion.answer === "NA" ? "default" : "outline"
                  }
                  onClick={() => handleMarkAnswer("NA")}
                  disabled={isAuditCompleted}
                >
                  N/A
                </Button>
              </div>
            </div>

            {/* Sub-questions */}
            {currentQuestion.subQuestions?.length ? (
              <div className="ml-4 space-y-3">
                {currentQuestion.subQuestions.map((subQ) => (
                  <div key={subQ.id}>
                    <Label className="text-sm">{subQ.text}</Label>
                    <div className="flex space-x-2 mt-1">
                      <Button
                        variant={subQ.answer === "YES" ? "default" : "outline"}
                        onClick={() => handleSubQCheck(subQ.id, "YES")}
                        disabled={isAuditCompleted}
                      >
                        Evet
                      </Button>
                      <Button
                        variant={subQ.answer === "NO" ? "default" : "outline"}
                        onClick={() => handleSubQCheck(subQ.id, "NO")}
                        disabled={isAuditCompleted}
                      >
                        Hayır
                      </Button>
                      <Button
                        variant={subQ.answer === "NA" ? "default" : "outline"}
                        onClick={() => handleSubQCheck(subQ.id, "NA")}
                        disabled={isAuditCompleted}
                      >
                        N/A
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Comment */}
            <div className="space-y-2">
              <Label>Yorum</Label>
              <Textarea
                value={currentQuestion.comment || ""}
                onChange={(e) =>
                  !isAuditCompleted &&
                  addCommentToQuestion(
                    auditId,
                    currentQuestion.id,
                    e.target.value
                  )
                }
                readOnly={isAuditCompleted}
              />
              <Button
                onClick={handleSaveComment}
                size="sm"
                disabled={isAuditCompleted}
              >
                Kaydet
              </Button>
            </div>

            {/* Photo upload */}
            <div className="space-y-2">
              <Label>Fotoğraf Ekle</Label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="w-full"
                disabled={isAuditCompleted}
              />
              {currentQuestion.photos?.length ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentQuestion.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Audit Photo ${index}`}
                        className="max-h-32 rounded-md"
                      />
                      {!isAuditCompleted && (
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
              ) : null}
            </div>

            {!isAuditCompleted && (
              <Button variant="outline" onClick={() => handleCreateBulgu()}>
                Bulgu Oluştur
              </Button>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="justify-between items-center sticky bottom-0 bg-white z-10">
          {/* Previous Question */}
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            Önceki
          </Button>

          {/* Progress */}
          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {audit.questions.length}
          </div>

          {/* Next or Finish */}
          {isLastQuestion && !isAuditCompleted ? (
            <Button variant="destructive" onClick={handleFinishAudit}>
              Denetimi Bitir
            </Button>
          ) : !isLastQuestion ? (
            <Button
              onClick={() =>
                setCurrentQuestionIndex((prev) =>
                  Math.min(audit.questions.length - 1, prev + 1)
                )
              }
            >
              Sonraki
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );

  /** Auditors use "Denetim" type for new findings, with foundBy = currentAuditorName. */
  function handleCreateBulgu() {
    const photos = currentQuestion.photos || [];
    const comment = currentQuestion.comment || "";

    if (!comment && photos.length === 0) {
      toast({
        title: "Bulgu Oluşturulamadı",
        description: "Lütfen fotoğraf veya yorum ekleyin.",
        variant: "destructive",
      });
      return;
    }

    findingStore.addFinding({
      type: "Denetim",
      status: "Açık",
      location: audit?.location || "",
      createdAt: new Date().toISOString(),
      comment,
      photos,
      foundBy: currentAuditorName, // <--- set the "Bulan Kişi" for audits
    });

    toast({
      title: "Bulgu Oluşturuldu",
      description:
        "Bu denetim maddesinde tespit edilen sorun Bulgular sayfasına eklendi.",
    });
  }
}
