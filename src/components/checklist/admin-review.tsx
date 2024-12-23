"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { mockChecklistsWithAnswers } from "@/app/(app)/checklist/yonetim/mock-data";

export default function AdminChecklistReview() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<any | null>(null);

  const locations = Array.from(
    new Set(mockChecklistsWithAnswers.map((c) => c.location))
  );

  const filteredChecklists = selectedLocation
    ? mockChecklistsWithAnswers.filter((c) => c.location === selectedLocation)
    : mockChecklistsWithAnswers;

  const calculateScore = (checklist: any) => {
    const totalQuestions = checklist.questions.length;
    const answeredQuestions = checklist.questions.filter(
      (q: any) => q.answer
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setSelectedLocation(value)}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Konum Seç" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Konumlar</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredChecklists.map((checklist) => (
          <Card
            key={checklist.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{checklist.title}</span>
                <Badge>{calculateScore(checklist)}%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Konum: {checklist.location}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedChecklist(checklist)}
                  >
                    Detayları Görüntüle
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{checklist.title}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-4">
                      {checklist.questions.map(
                        (question: any, index: number) => (
                          <div key={question.id} className="border-b pb-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`question-${question.id}`}
                                checked={question.answer}
                                disabled
                              />
                              <Label htmlFor={`question-${question.id}`}>
                                {question.text}
                              </Label>
                            </div>
                            {question.comment && (
                              <p className="mt-2 text-sm text-muted-foreground">
                                Yorum: {question.comment}
                              </p>
                            )}
                            {question.image && (
                              <div className="mt-2">
                                <Image
                                  src={question.image}
                                  alt="Soru görseli"
                                  width={200}
                                  height={200}
                                  className="rounded-md"
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
                  <div className="mt-4 text-right">
                    <Badge>Skor: {calculateScore(checklist)}%</Badge>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
