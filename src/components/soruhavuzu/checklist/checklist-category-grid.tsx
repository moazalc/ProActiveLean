import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";

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

interface ChecklistCategoryGridProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export function ChecklistCategoryGrid({
  categories,
  onEdit,
  onDelete,
}: ChecklistCategoryGridProps) {
  const columns: Column<Category>[] = [
    { key: "name", header: "Kategori Adı", sortable: true },
    {
      key: "locationCategory",
      header: "Konum Kategori",
      sortable: true,
      render: (value) => value.name,
    },
    {
      key: "questions",
      header: "Soru Sayısı",
      sortable: true,
      render: (value) => value.length,
    },
  ];

  const renderActions = (category: Category) => (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(category.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <DataGrid
      data={categories}
      columns={columns}
      pageSize={10}
      renderActions={renderActions}
    />
  );
}
