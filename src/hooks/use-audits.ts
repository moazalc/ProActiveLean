import { useState, useEffect, useMemo } from "react";
import { Audit } from "@/types/audit";

export function useAudits() {
  const [audits, setAudits] = useState<Audit[]>([]);

  useEffect(() => {
    fetch("/api/checklist-assignments")
      .then((res) => res.json())
      .then((data) => {
        const processedAudits = data.map(processAudit);
        setAudits(processedAudits);
      });
  }, []);

  const addAudit = (auditData: any) => {
    fetch("/api/checklist-assignments", {
      method: "POST",
      body: JSON.stringify(auditData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newAudit) => {
        setAudits([...audits, processAudit(newAudit)]);
      });
  };

  const updateAudit = (id: string, auditData: any) => {
    fetch(`/api/checklist-assignments/${id}`, {
      method: "PUT",
      body: JSON.stringify(auditData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedAudit) => {
        setAudits(
          audits.map((audit) =>
            audit.id === id ? processAudit(updatedAudit) : audit
          )
        );
      });
  };

  const deleteAudit = (id: string) => {
    fetch(`/api/checklist-assignments/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setAudits(audits.filter((audit) => audit.id !== id));
        } else {
          throw new Error("Failed to delete audit");
        }
      })
      .catch((error) => {
        console.error("Error deleting audit:", error);
      });
  };

  const statusCounts = useMemo(() => {
    return {
      all: audits.length,
      expired: audits.filter((a) => a.status === "Tarih Geçmişler").length,
      approaching: audits.filter(
        (a) => a.status === "Denetim Tarihi Yaklaşanlar"
      ).length,
      planned: audits.filter((a) => a.status === "Yapılacaklar").length,
      incomplete: audits.filter((a) => a.status === "Aksiyonları Devam Edenler")
        .length,
      closed: audits.filter((a) => a.status === "Kapanmışlar").length,
    };
  }, [audits]);

  return { audits, addAudit, updateAudit, deleteAudit, statusCounts };
}

function processAudit(audit: any): Audit {
  const now = new Date();
  return {
    id: audit.id,
    locationCategoryId: `${audit.locationCategory.name}`,
    createdByUserId: `${audit.userBy.firstName} ${audit.userBy.lastName}`,
    denetci: `${audit.user.firstName} ${audit.user.lastName}`,
    denetimTarihi: new Date(audit.dateDue),
    tur: getFrequencyLabel(audit.type),
    questionCount: 0,
    yesCount: 0,
    activity: audit?.checklistActivity,
    status: getAuditStatus(audit, now),
  };
}

function getFrequencyLabel(type: string): string {
  const frequencies: { [key: string]: string } = {
    daily: "Günlük",
    weekly: "Haftalık",
    monthly: "Aylık",
  };
  return frequencies[type] || "";
}

function getAuditStatus(audit: any, now: Date): Audit["status"] {
  const completed = audit?.checklistActivity[0]?.completed || false;
  const dateDue = new Date(audit.dateDue);

  if (!completed && dateDue < now) return "Tarih Geçmişler";
  if (!completed && dateDue.toDateString() === now.toDateString())
    return "Denetim Tarihi Yaklaşanlar";
  if (completed && dateDue.getTime() === now.getTime())
    return "Aksiyonları Devam Edenler";
  if (completed && dateDue < now) return "Kapanmışlar";
  return "Yapılacaklar";
}
