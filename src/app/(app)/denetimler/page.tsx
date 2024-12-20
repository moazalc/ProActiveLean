"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AuditDialog } from "@/components/denetimleri/audit-dialog";
import { AuditFilters } from "@/components/denetimleri/audit-filters";
import { StatusCards } from "@/components/denetimleri/status-card";
import { AuditList } from "@/components/denetimleri/audit-list";
import { useAudits } from "@/hooks/use-audits";
import { useLocationsAndUsers } from "@/hooks/use-locations-and-users";
import { useToast } from "@/hooks/use-toast";

export default function ChecklistAudits() {
  const [isAddAuditOpen, setIsAddAuditOpen] = useState(false);
  const [editingAudit, setEditingAudit] = useState<{ id: string } | null>(null);
  const [filterMonth, setFilterMonth] = useState<Date | undefined>();
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterAuditor, setFilterAuditor] = useState<string>("");

  const { audits, addAudit, updateAudit } = useAudits();
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
function deleteAudit(id: string) {
  throw new Error("Function not implemented.");
}

