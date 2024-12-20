import { useState, useEffect } from "react";
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Category {
  id?: number;
  name: string;
  locationCategoryId: number;
  locationCategory: Location;
  questions: Question[];
  userId: number;
}

interface Location {
  id: string;
  name: string;
}

interface Question {
  question: string;
}

interface ChecklistCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category: Category | null;
  locations: Location[];
}

export function ChecklistCategoryDialog({
  isOpen,
  onClose,
  onSave,
  category,
  locations,
}: ChecklistCategoryDialogProps) {
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    locationCategoryId: 0,
    locationCategory: { id: "", name: "" },
    questions: [],
    userId: 0,
  });

  useEffect(() => {
    if (category) {
      setNewCategory(category);
    } else {
      setNewCategory({
        name: "",
        locationCategoryId: 0,
        locationCategory: { id: "", name: "" },
        questions: [],
        userId: 0,
      });
    }
  }, [category]);

  const addQuestion = () => {
    setNewCategory({
      ...newCategory,
      questions: [...newCategory.questions, { question: "" }],
    });
  };

  const updateQuestionText = (questionIndex: number, newText: string) => {
    const updatedQuestions = newCategory.questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, question: newText };
      }
      return question;
    });
    setNewCategory({ ...newCategory, questions: updatedQuestions });
  };

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = newCategory.questions.filter(
      (_, index) => index !== questionIndex
    );
    setNewCategory({ ...newCategory, questions: updatedQuestions });
  };

  const handleSave = () => {
    onSave(newCategory);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {category ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Kategori Adı"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="text-xl font-semibold"
            required
          />
          <Select
            value={newCategory.locationCategoryId.toString()}
            onValueChange={(value) =>
              setNewCategory({
                ...newCategory,
                locationCategoryId: parseInt(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Konum Kategori Seç" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Card className="p-4">
            <CardHeader className="p-0 mb-4">
              <h3 className="text-lg font-semibold">Sorular</h3>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {newCategory.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="flex items-center space-x-2"
                >
                  <Textarea
                    placeholder="Soru"
                    value={question.question}
                    onChange={(e) =>
                      updateQuestionText(questionIndex, e.target.value)
                    }
                    className="flex-grow"
                    required
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Soru Ekle
              </Button>
            </CardContent>
          </Card>
          <Button type="button" className="w-full" onClick={handleSave}>
            {category ? "Güncelle" : "Oluştur"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

