import React, { useState } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AuditQuestion } from "@/types/audits";
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
  } = useAuditStore();
  const { toast } = useToast();
  const audit = audits.find((a) => a.id === auditId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!audit) return null;

  const currentQuestion = audit.questions[currentQuestionIndex];

  const handleMarkAnswer = (checked: boolean) => {
    markAnswer(auditId, currentQuestion.id, checked);
  };

  const handleSubQCheck = (subQId: string, checked: boolean) => {
    markSubQuestionAnswer(auditId, currentQuestion.id, subQId, checked);
  };

  const handleSaveComment = () => {
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
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={currentQuestion.answered}
                  onCheckedChange={handleMarkAnswer}
                />
                <Label className="text-sm">{currentQuestion.text}</Label>
              </div>

              {currentQuestion.subQuestions &&
                currentQuestion.subQuestions.length > 0 && (
                  <div className="ml-4 space-y-1">
                    {currentQuestion.subQuestions.map((subQ) => (
                      <div
                        key={subQ.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={subQ.answered || false}
                          onCheckedChange={(val) =>
                            handleSubQCheck(subQ.id, Boolean(val))
                          }
                        />
                        <Label className="text-sm">{subQ.text}</Label>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="space-y-2">
              <Label>Yorum</Label>
              <Textarea
                value={currentQuestion.comment || ""}
                onChange={(e) =>
                  addCommentToQuestion(
                    auditId,
                    currentQuestion.id,
                    e.target.value
                  )
                }
              />
              <Button onClick={handleSaveComment} size="sm">
                Kaydet
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Fotoğraf Ekle</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full"
              />
            </div>

            {currentQuestion.photo && (
              <img
                src={currentQuestion.photo}
                alt="Audit Question"
                className="max-h-32 mt-1 rounded-md"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between sticky bottom-0 bg-white z-10">
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            Önceki
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {audit.questions.length}
          </div>
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(audit.questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === audit.questions.length - 1}
          >
            Sonraki
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
