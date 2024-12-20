import { useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Check, Trash2 } from "lucide-react";
import { Audit } from "@/types/audit";

interface AuditListProps {
  audits: Audit[];
  filterMonth: Date | undefined;
  filterLocation: string;
  filterAuditor: string;
  onEdit: (audit: Audit) => void;
  onDelete: (id: string) => void;
}

export function AuditList({
  audits,
  filterMonth,
  filterLocation,
  filterAuditor,
  onEdit,
  onDelete,
}: AuditListProps) {
  const filteredAudits = useMemo(() => {
    return audits.filter((audit) => {
      const matchesMonth =
        !filterMonth ||
        audit.denetimTarihi.getMonth() === filterMonth.getMonth();
      const matchesLocation =
        !filterLocation || audit.locationCategoryId === filterLocation;
      const matchesAuditor = !filterAuditor || audit.denetci === filterAuditor;
      return matchesMonth && matchesLocation && matchesAuditor;
    });
  }, [audits, filterMonth, filterLocation, filterAuditor]);

  const getStatusColor = (status: Audit["status"]) => {
    switch (status) {
      case "Tarih Geçmişler":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Denetim Tarihi Yaklaşanlar":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Yapılacaklar":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "Aksiyonları Devam Edenler":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Kapanmışlar":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const calculateScore = (yesCount: number, totalCount: number) => {
    if (totalCount === 0) return 0;
    return Math.round((yesCount / totalCount) * 100);
  };

  return (
    <div className="space-y-4">
      {filteredAudits.map((audit) => (
        <Card
          key={audit.id}
          className="hover:shadow-md transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="space-y-2 mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Kategori:{" "}
                  <span className="font-normal">
                    {audit.locationCategoryId}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sorumlu: {audit.createdByUserId} | Denetçi: {audit.denetci}
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    Denetim Tarihi: {format(audit.denetimTarihi, "PP")}
                  </span>
                  {audit.tamamlanmaTarihi && (
                    <span>
                      Tamamlanma Tarihi: {format(audit.tamamlanmaTarihi, "PP")}
                    </span>
                  )}
                  <span>
                    Puan: {calculateScore(audit.yesCount, audit.questionCount)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    audit.status
                  )}`}
                >
                  {audit.status}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(audit)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(audit.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a
                        href={"/checklistaccordion/?id=" + audit.id}
                        className="flex items-center"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Denetle
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
