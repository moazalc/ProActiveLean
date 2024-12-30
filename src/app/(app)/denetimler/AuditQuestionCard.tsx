import React, { useState } from "react";
import { useAuditStore } from "@/store/useAuditStore";
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
  const audit = audits.find((a) => a.id === auditId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!audit) return null;

  const currentQuestion = audit.questions[currentQuestionIndex];
  const isAuditCompleted = audit.completed; // <-- We'll use this flag to disable editing

  // Handler for main question (Yes/No/NA)
  const handleMarkAnswer = (answer: "YES" | "NO" | "NA") => {
    if (!isAuditCompleted) {
      markAnswer(auditId, currentQuestion.id, answer);
    }
  };

  // Handler for sub-question (Yes/No/NA)
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAuditCompleted) return; // No-op if audit is completed

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

  // If we are on the last question, show "Denetimi Bitir" button (only if not completed)
  const isLastQuestion = currentQuestionIndex === audit.questions.length - 1;
  const handleFinishAudit = () => {
    finishAudit(auditId);
    toast({
      title: "Denetim Tamamlandı",
      description: "Denetim başarıyla tamamlandı.",
      duration: 3000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <Card className="min-h-screen flex flex-col border-0 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10">
          <CardTitle>Denetim Soruları</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="space-y-4 max-w-3xl mx-auto py-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Kategori:</span>{" "}
              {currentQuestion.category}
              <span className="font-semibold ml-2">Madde:</span>{" "}
              {currentQuestion.itemLabel}
            </div>

            {/* Main Question - Yes/No/NA Buttons */}
            <div className="space-y-2">
              <Label className="text-sm">{currentQuestion.text}</Label>
              <div className="flex space-x-2">
                {/* YES button */}
                <Button
                  variant={
                    currentQuestion.answer === "YES" ? "default" : "outline"
                  }
                  onClick={() => handleMarkAnswer("YES")}
                  disabled={isAuditCompleted} // disable in read-only
                >
                  Evet
                </Button>
                {/* NO button */}
                <Button
                  variant={
                    currentQuestion.answer === "NO" ? "default" : "outline"
                  }
                  onClick={() => handleMarkAnswer("NO")}
                  disabled={isAuditCompleted}
                >
                  Hayır
                </Button>
                {/* N/A button */}
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

            {/* Sub-questions (if any) - each with Yes/No/NA */}
            {currentQuestion.subQuestions &&
              currentQuestion.subQuestions.length > 0 && (
                <div className="ml-4 space-y-3">
                  {currentQuestion.subQuestions.map((subQ) => (
                    <div key={subQ.id}>
                      <Label className="text-sm">{subQ.text}</Label>
                      <div className="flex space-x-2 mt-1">
                        <Button
                          variant={
                            subQ.answer === "YES" ? "default" : "outline"
                          }
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
              )}

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
                readOnly={isAuditCompleted} // read-only if completed
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
              {/* List of photos (if any) */}
              {currentQuestion.photos && currentQuestion.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentQuestion.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Audit Photo ${index}`}
                        className="max-h-32 rounded-md"
                      />
                      {/* Hide remove photo button if completed (read-only) */}
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
              )}
            </div>
          </div>
        </CardContent>

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

          {/* Progress: x / total */}
          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {audit.questions.length}
          </div>

          {/* Next Question or Finish Audit */}
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
}
