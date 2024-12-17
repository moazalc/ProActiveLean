"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MoreVertical, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { mockChecklists } from "../mock-data";

export default function ChecklistAnswering({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const checklist = mockChecklists.find((c) => c.id === params.id);

  if (!checklist) {
    return <div>Kontrol listesi bulunamadı.</div>;
  }

  const [answers, setAnswers] = useState<Record<string, boolean>>(
    Object.fromEntries(checklist.questions.map((q) => [q.id, false]))
  );

  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: checked }));
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to your backend
    console.log(answers);
    toast({
      title: "Kontrol Listesi Gönderildi",
      description: "Cevaplarınız başarıyla kaydedildi.",
    });
    router.push("/checklist");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {checklist.title}
          </CardTitle>
          <div className="flex justify-between items-center mt-2">
            <span>Konum: {checklist.location}</span>
            <Badge
              variant={
                checklist.status === "completed"
                  ? "outline"
                  : checklist.status === "overdue"
                  ? "destructive"
                  : "default"
              }
            >
              {checklist.status === "completed"
                ? "Tamamlandı"
                : checklist.status === "overdue"
                ? "Gecikmiş"
                : "Beklemede"}
            </Badge>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>
              Son Tarih:{" "}
              {format(new Date(checklist.dueDate), "dd MMMM yyyy", {
                locale: tr,
              })}
            </span>
            <Badge
              variant={
                checklist.priority === "high"
                  ? "destructive"
                  : checklist.priority === "medium"
                  ? "default"
                  : "secondary"
              }
            >
              {checklist.priority === "high"
                ? "Yüksek"
                : checklist.priority === "medium"
                ? "Orta"
                : "Düşük"}{" "}
              Öncelik
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklist.questions.map((question) => (
              <div
                key={question.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={question.id}
                    checked={answers[question.id]}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(question.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={question.id}>{question.text}</Label>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yorum ve Fotoğraf Ekle</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea placeholder="Yorumunuzu buraya yazın..." />
                      <div>
                        <Label htmlFor="picture">Fotoğraf Yükle</Label>
                        <Input id="picture" type="file" accept="image/*" />
                      </div>
                      <Button className="w-full">
                        <Upload className="mr-2 h-4 w-4" /> Yükle
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6" onClick={handleSubmit}>
            Kontrol Listesini Gönder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
