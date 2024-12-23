"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for questions
const mockQuestions = {
  Temizlik: [
    { id: 1, question: "Zemin temiz mi?" },
    { id: 2, question: "Masalar düzenli mi?" },
  ],
  Duzen: [
    { id: 3, question: "Dosyalar düzgün sıralanmış mı?" },
    { id: 4, question: "Ekipmanlar yerinde mi?" },
  ],
  "Bolum Periyodik": [
    { id: 5, question: "Haftalık bakım yapıldı mı?" },
    { id: 6, question: "Aylık rapor hazırlandı mı?" },
  ],
  Kontroller: [
    { id: 7, question: "Güvenlik kontrolleri tamamlandı mı?" },
    { id: 8, question: "Yangın söndürücüler kontrol edildi mi?" },
  ],
};

export default function AuditPage() {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate score whenever answers change
    const yesCount = Object.values(answers).filter((a) => a === "yes").length;
    const totalQuestions = Object.values(mockQuestions).flat().length;
    setScore(Math.round((yesCount / totalQuestions) * 100));
  }, [answers]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to your backend
    console.log("Submitted answers:", answers);
    toast({
      title: "Denetim Tamamlandı",
      description: "Denetim başarıyla tamamlandı ve kaydedildi.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Denetim #{id}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(mockQuestions).map(([category, questions]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              {questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <p className="mb-2">{q.question}</p>
                  <RadioGroup
                    onValueChange={(value) => handleAnswerChange(q.id, value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${q.id}`} />
                      <Label htmlFor={`yes-${q.id}`}>Evet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${q.id}`} />
                      <Label htmlFor={`no-${q.id}`}>Hayır</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id={`na-${q.id}`} />
                      <Label htmlFor={`na-${q.id}`}>N/A</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">Toplam Puan: {score}%</p>
        <Button onClick={handleSubmit}>Denetimi Gönder</Button>
      </div>
    </div>
  );
}
