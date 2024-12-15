"use client";

import { useState } from "react";
import { QuestionPool } from "@/components/soruhavuzu/question-pool";
import { AddQuestionForm } from "@/components/soruhavuzu/add-question-form";
import { QuestionFilter } from "@/components/soruhavuzu/question-filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Question, Area, User } from "@/types/questions";

// Mock data - replace with actual data fetching
const mockAreas: Area[] = [
  { id: "1", name: "Alan 1", questions: [] },
  { id: "2", name: "Alan 2", questions: [] },
];

const mockQuestions: Question[] = [
  {
    id: "1",
    sequence: 1,
    text: "Dolaplar 5S Sistematiğine Uygun Mu?",
    isChecklist: false,
    relatedAreas: ["1"],
    subQuestions: [],
    usedInInspection: false,
    count: 2,
  },
  // Add more mock questions as needed
];

const currentUser: User = {
  isAdmin: true,
};

export default function QuestionsPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [questions, setQuestions] = useState(mockQuestions);

  const filteredQuestions = selectedArea
    ? questions.filter((q) => q.relatedAreas.includes(selectedArea))
    : questions;

  const handleAddQuestion = (data: {
    text: string;
    isChecklist: boolean;
    checklistItems: string[];
    relatedAreas: string[];
  }) => {
    const newQuestion: Question = {
      id: String(questions.length + 1),
      sequence: questions.length + 1,
      text: data.text,
      isChecklist: data.isChecklist,
      checklistItems: data.checklistItems,
      relatedAreas: data.relatedAreas,
      subQuestions: [],
      usedInInspection: false,
      count: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <QuestionFilter
          areas={mockAreas}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Temel Soru Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yeni Soru Ekle</DialogTitle>
            </DialogHeader>
            <AddQuestionForm
              areas={mockAreas}
              onSubmit={(data) => {
                handleAddQuestion(data);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <QuestionPool
        questions={filteredQuestions}
        currentUser={currentUser}
        onEdit={(id) => console.log("Edit question", id)}
        onDelete={(id) => {
          if (confirm("Bu soruyu silmek istediğinizden emin misiniz?")) {
            setQuestions(questions.filter((q) => q.id !== id));
          }
        }}
      />
    </div>
  );
}
