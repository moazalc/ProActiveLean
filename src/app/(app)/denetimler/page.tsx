"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AuditDialog } from "@/components/denetimleri/audit-dialog";
import { AuditFilters } from "@/components/denetimleri/audit-filters";
import { StatusCards } from "@/components/denetimleri/status-card";
import { AuditList } from "@/components/denetimleri/audit-list";
import { useAudits } from "@/hooks/use-audits";
import { useLocationsAndUsers } from "@/hooks/use-locations-and-users";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, PlayCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ChecklistAudits() {
  const [isAddAuditOpen, setIsAddAuditOpen] = useState(false);
  const [editingAudit, setEditingAudit] = useState<{ id: string } | null>(null);
  const [filterMonth, setFilterMonth] = useState<Date | undefined>();
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterAuditor, setFilterAuditor] = useState<string>("");

  const { audits, addAudit, updateAudit, deleteAudit } = useAudits();
  const { locations, users } = useLocationsAndUsers();
  const { toast } = useToast();

  const handleSaveAudit = (auditData: any) => {
    if (editingAudit) {
      updateAudit(editingAudit.id, auditData);
      toast({
        title: "Denetim Güncellendi",
        description: "Denetim başarıyla güncellendi.",
        variant: "default",
      });
    } else {
      addAudit(auditData);
      toast({
        title: "Denetim Eklendi",
        description: "Yeni denetim başarıyla eklendi.",
        variant: "default",
      });
    }
    setIsAddAuditOpen(false);
    setEditingAudit(null);
  };

  const handleDeleteAudit = (id: string) => {
    deleteAudit(id);
    toast({
      title: "Denetim Silindi",
      description: "Denetim başarıyla silindi.",
      variant: "destructive",
    });
  };

  // Mock audit data for example
  const mockAudit = {
    id: "1",
    locationCategoryId: "Mutfak",
    createdByUserId: "Ahmet Yılmaz",
    denetci: "Ayşe Demir",
    denetimTarihi: new Date("2024-12-30"),
    status: "Yapılacaklar",
    questionCount: 20,
    yesCount: 15,
  };

  const getStatusColor = (status: string) => {
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Checklist Denetimleri
        </h1>
        <Button
          onClick={() => setIsAddAuditOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Denetim Ekle
        </Button>
      </div>

      <AuditFilters
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filterAuditor={filterAuditor}
        setFilterAuditor={setFilterAuditor}
        locations={locations}
        users={users}
      />

      <StatusCards audits={audits} />

      {/* Mock Audit Card Example */}
      <Card className="hover:shadow-md transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="space-y-2 mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Kategori:{" "}
                <span className="font-normal">
                  {mockAudit.locationCategoryId}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sorumlu: {mockAudit.createdByUserId} | Denetçi:{" "}
                {mockAudit.denetci}
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Denetim Tarihi:{" "}
                  {mockAudit.denetimTarihi.toLocaleDateString("tr-TR")}
                </span>
                <span>
                  Puan:{" "}
                  {Math.round(
                    (mockAudit.yesCount / mockAudit.questionCount) * 100
                  )}
                  %
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  mockAudit.status
                )}`}
              >
                {mockAudit.status}
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
                  <DropdownMenuItem onClick={() => setEditingAudit(mockAudit)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Düzenle
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteAudit(mockAudit.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Sil
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/denetimler/${mockAudit.id}`}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Denetim Başla
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuditList
        audits={audits}
        filterMonth={filterMonth}
        filterLocation={filterLocation}
        filterAuditor={filterAuditor}
        onEdit={setEditingAudit}
        onDelete={handleDeleteAudit}
      />

      <AuditDialog
        isOpen={isAddAuditOpen}
        onOpenChange={setIsAddAuditOpen}
        onSave={handleSaveAudit}
        editingAudit={editingAudit}
        locations={locations}
        users={users}
      />
    </div>
  );
}
