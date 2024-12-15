"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionPool } from "@/components/soruhavuzu/question-pool";
import { AddQuestionForm } from "@/components/soruhavuzu/add-question-form";
import { QuestionFilter } from "@/components/soruhavuzu/question-filter";
import { DeleteConfirmation } from "@/components/soruhavuzu/delete-confirmation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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

const mockSubQuestions: Question[] = [
  {
    id: "sub1",
    sequence: 1,
    text: "Dolap İçinde Raflar / Gözler Tanımlı Mı?",
    isChecklist: false,
    relatedAreas: ["1"],
    subQuestions: [],
    usedInInspection: false,
    count: 0,
  },
  {
    id: "sub2",
    sequence: 2,
    text: "Dolap İçindeki Malzemeler Tanımlı Olduğu Alanda Mı?",
    isChecklist: false,
    relatedAreas: ["1"],
    subQuestions: [],
    usedInInspection: false,
    count: 0,
  },
];

const currentUser: User = {
  isAdmin: true,
};

export default function SubQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [questions, setQuestions] = useState(mockSubQuestions);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

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
    toast({
      title: "Alt Soru Eklendi",
      description: "Yeni alt soru başarıyla eklendi.",
    });
  };

  const handleDelete = (id: string) => {
    setQuestionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (questionToDelete) {
      setQuestions(questions.filter((q) => q.id !== questionToDelete));
      toast({
        title: "Alt Soru Silindi",
        description: "Alt soru başarıyla silindi.",
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Geri
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <QuestionFilter
          areas={mockAreas}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Alt Soru Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yeni Alt Soru Ekle</DialogTitle>
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
        onEdit={(id) => {
          console.log("Edit sub-question", id);
          toast({
            title: "Alt Soru Düzenlendi",
            description: "Alt soru başarıyla güncellendi.",
          });
        }}
        onDelete={handleDelete}
        isSubQuestion={true}
      />

      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
