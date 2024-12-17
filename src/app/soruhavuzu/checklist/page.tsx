"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ChecklistCategoryDialog } from "@/components/soruhavuzu/checklist/checklist-category-dialog";
import { ChecklistCategoryGrid } from "@/components/soruhavuzu/checklist/checklist-category-grid";
import { mockCategories, mockLocations } from "./mock-data";

interface Category {
  id: number;
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

export default function ChecklistPool() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // setCategories(fetchedCategories);
    // setLocations(fetchedLocations);
  }, []);

  const handleCreateCategory = (newCategory: Omit<Category, "id">) => {
    const category = { ...newCategory, id: Date.now() };
    setCategories([...categories, category]);
    setIsDialogOpen(false);
    toast({
      title: "Kategori Oluşturuldu",
      description: "Yeni kategori başarıyla eklendi.",
    });
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setIsDialogOpen(false);
    setEditingCategory(null);
    toast({
      title: "Kategori Güncellendi",
      description: "Kategori başarıyla güncellendi.",
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast({
      title: "Kategori Silindi",
      description: "Kategori başarıyla silindi.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">
            Checklist Soru Havuzu
          </CardTitle>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Checklist Ekle
          </Button>
        </CardHeader>
        <CardContent>
          <ChecklistCategoryGrid
            categories={categories}
            onEdit={(category) => {
              setEditingCategory(category);
              setIsDialogOpen(true);
            }}
            onDelete={handleDeleteCategory}
          />
        </CardContent>
      </Card>

      <ChecklistCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingCategory(null);
        }}
        onSave={editingCategory ? handleUpdateCategory : handleCreateCategory}
        category={editingCategory}
        locations={locations}
      />
    </div>
  );
}
