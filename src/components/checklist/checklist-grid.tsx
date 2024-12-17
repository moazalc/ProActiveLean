import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Checklist {
  id: string;
  title: string;
  location: string;
  dueDate: Date;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "overdue";
}

interface ChecklistGridProps {
  checklists: Checklist[];
}

export function ChecklistGrid({ checklists }: ChecklistGridProps) {
  const router = useRouter();

  const columns: Column<Checklist>[] = [
    { key: "title", header: "Başlık", sortable: true },
    { key: "location", header: "Konum", sortable: true },
    {
      key: "dueDate",
      header: "Son Tarih",
      sortable: true,
      render: (value) =>
        format(new Date(value), "dd MMMM yyyy", { locale: tr }),
    },
    {
      key: "priority",
      header: "Öncelik",
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === "high"
              ? "destructive"
              : value === "medium"
              ? "default"
              : "secondary"
          }
        >
          {value === "high" ? "Yüksek" : value === "medium" ? "Orta" : "Düşük"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Durum",
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === "completed"
              ? "secondary"
              : value === "overdue"
              ? "destructive"
              : "default"
          }
        >
          {value === "completed"
            ? "Tamamlandı"
            : value === "overdue"
            ? "Gecikmiş"
            : "Beklemede"}
        </Badge>
      ),
    },
  ];

  const handleRowClick = (checklist: Checklist) => {
    router.push(`/checklist/${checklist.id}`);
  };

  return (
    <DataGrid
      data={checklists}
      columns={columns}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  );
}
