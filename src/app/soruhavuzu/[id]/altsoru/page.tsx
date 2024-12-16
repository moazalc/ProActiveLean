"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionPool } from "@/components/soruhavuzu/question-pool";
import { AddQuestionForm } from "@/components/soruhavuzu/add-question-form";
import { QuestionCardFilter } from "@/components/soruhavuzu/question-card-filter";
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
import type { Question, User } from "@/types/questions";

const areaData = [
  {
    id: "1",
    title: "Temizlik",
    temelSoruCount: 5,
    altSoruCount: 15,
    color: "blue",
    icon: "cleaning",
  },
  {
    id: "2",
    title: "Düzen",
    temelSoruCount: 3,
    altSoruCount: 9,
    color: "green",
    icon: "order",
  },
  {
    id: "3",
    title: "Bölüm Periyodik",
    temelSoruCount: 4,
    altSoruCount: 12,
    color: "yellow",
    icon: "periodic",
  },
  {
    id: "4",
    title: "Kontroller",
    temelSoruCount: 6,
    altSoruCount: 18,
    color: "red",
    icon: "control",
  },
];

const mockSubQuestions: Question[] = [
  {
    id: "sub1",
    sequence: 1,
    text: "Dolap İçinde Raflar / Gözler Tanımlı Mı?",
    isChecklist: false,
    areas: ["Katlar"],
    subQuestions: [],
    usedInInspection: false,
    count: 0,
    cardArea: "1",
    relatedAreas: [],
  },
  {
    id: "sub2",
    sequence: 2,
    text: "Dolap İçindeki Malzemeler Tanımlı Olduğu Alanda Mı?",
    isChecklist: false,
    areas: ["Lobi"],
    subQuestions: [],
    usedInInspection: false,
    count: 0,
    cardArea: "2",
    relatedAreas: [],
  },
];

const currentUser: User = {
  isAdmin: true,
};

export default function SubQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCardArea, setSelectedCardArea] = useState<string | null>(null);
  const [questions, setQuestions] = useState(mockSubQuestions);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const filteredQuestions = selectedCardArea
    ? questions.filter((q) => q.cardArea === selectedCardArea)
    : questions;

  const handleAddQuestion = (data: {
    text: string;
    isChecklist: boolean;
    checklistItems: string[];
    areas: string[];
  }) => {
    const newQuestion: Question = {
      id: String(questions.length + 1),
      sequence: questions.length + 1,
      text: data.text,
      isChecklist: data.isChecklist,
      checklistItems: data.checklistItems,
      areas: data.areas,
      subQuestions: [],
      usedInInspection: false,
      count: 0,
      cardArea: selectedCardArea || "1", // Default to "Temizlik" if no card is selected
      relatedAreas: [],
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

  const handleEdit = (id: string) => {
    const questionToEdit = questions.find((q) => q.id === id);
    if (questionToEdit) {
      setEditingQuestion(questionToEdit);
    }
  };

  const handleEditSubmit = (data: {
    text: string;
    isChecklist: boolean;
    checklistItems: string[];
    areas: string[];
  }) => {
    if (editingQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.id === editingQuestion.id
          ? { ...q, ...data, cardArea: editingQuestion.cardArea }
          : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
      toast({
        title: "Alt Soru Düzenlendi",
        description: "Alt soru başarıyla güncellendi.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Geri
        </Button>
        <h1 className="text-2xl font-bold">Alt Sorular</h1>
      </div>

      <QuestionCardFilter
        areas={areaData}
        selectedArea={selectedCardArea}
        onAreaChange={setSelectedCardArea}
      />

      <div className="flex justify-end">
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
            <AddQuestionForm onSubmit={handleAddQuestion} />
          </DialogContent>
        </Dialog>
      </div>

      <QuestionPool
        questions={filteredQuestions}
        currentUser={currentUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isSubQuestion={true}
      />

      <DeleteConfirmation
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      {editingQuestion && (
        <Dialog
          open={!!editingQuestion}
          onOpenChange={() => setEditingQuestion(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Alt Soru Düzenle</DialogTitle>
            </DialogHeader>
            <AddQuestionForm
              onSubmit={handleEditSubmit}
              initialData={{
                text: editingQuestion.text,
                isChecklist: editingQuestion.isChecklist,
                checklistItems: editingQuestion.checklistItems || [],
                areas: editingQuestion.areas,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
