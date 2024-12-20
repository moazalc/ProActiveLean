"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface CategoryInfo {
  id: number;
  name: string;
  parentId: number;
  parent?: {
    id: number;
    name: string;
  };
}

const columns: Column<CategoryInfo>[] = [
  { key: "name", header: "Tanımlama Adı", sortable: true },
  {
    key: "parent",
    header: "Tanımlama Velisi",
    sortable: true,
    render: (value, item) => (item.parent ? item.parent.name : "-"),
  },
];

export default function LocationCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [newCategory, setNewCategory] = useState<Partial<CategoryInfo>>({
    name: "",
    parentId: undefined,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(
    null
  );

  const handleAddCategory = () => {
    fetch("/api/location-categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories([...categories, data]);
        setIsDialogOpen(false);
        setNewCategory({ name: "", parentId: undefined });
        fetchCategories();
        toast({
          title: "Tanımlama Eklendi",
          description: `${data.name} başarıyla eklendi.`,
        });
      });
  };

  const handleEdit = (category: CategoryInfo) => {
    setEditingCategory(category);
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      fetch(`/api/location-categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCategory),
      })
        .then((res) => res.json())
        .then(() => {
          setEditingCategory(null);
          fetchCategories();
          toast({
            title: "Tanımlama Güncellendi",
            description: `${editingCategory.name} başarıyla güncellendi.`,
          });
        });
    }
  };

  const handleDelete = (id: number) => {
    const categoryToDelete = categories.find((cat) => cat.id === id);
    fetch(`/api/location-categories/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchCategories();
      if (categoryToDelete) {
        toast({
          title: "Tanımlama Silindi",
          description: `${categoryToDelete.name} başarıyla silindi.`,
          variant: "destructive",
        });
      }
    });
  };

  const fetchCategories = () => {
    fetch("/api/location-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderActions = (category: CategoryInfo) => (
    <div className="flex space-x-2">
      {editingCategory?.id === category.id ? (
        <Button onClick={handleSaveEdit}>Kaydet</Button>
      ) : (
        <Button onClick={() => handleEdit(category)} className="p-2">
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      <Button
        onClick={() => handleDelete(category.id)}
        variant="destructive"
        className="p-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl">Tanımlama Ayarları</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Yeni Tanımlama Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Tanımlama Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="category-name" className="text-lg">
                  Tanımlama Adı
                </Label>
                <Input
                  id="category-name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category-parent" className="text-lg">
                  Tanımlama Sahibi
                </Label>
                <Select
                  value={newCategory.parentId?.toString() || ""}
                  onValueChange={(value) =>
                    setNewCategory({
                      ...newCategory,
                      parentId: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {categories.find(
                        (category) => category.id === newCategory.parentId
                      )?.name || "Seçiniz"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddCategory} disabled={!newCategory.name}>
              Ekle
            </Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataGrid
          data={categories}
          columns={columns}
          pageSize={10}
          renderActions={renderActions}
        />
      </CardContent>
    </Card>
  );
}
