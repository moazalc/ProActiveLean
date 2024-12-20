import { format } from "date-fns";
import { tr } from "date-fns/locale";

const auditCategories = [
  { value: "temizlik", label: "Temizlik" },
  { value: "duzen", label: "Düzen" },
  { value: "bolum-periyodik", label: "Bölüm Periyodik" },
  { value: "kontroller", label: "Kontroller" },
];

const auditTypes = [
  { value: "monthly", label: "Aylık Denetim" },
  { value: "weekly", label: "Haftalık Denetim" },
  { value: "daily", label: "Günlük Denetim" },
  { value: "unannounced", label: "Anlık Denetim" },
];

interface AuditSummaryProps {
  auditCategory: string;
  auditType: string;
  auditFrequency: string;
  customInterval: string;
  selectedDate: Date | undefined;
  auditor: string;
}

export function AuditSummary({
  auditCategory,
  auditType,
  auditFrequency,
  customInterval,
  selectedDate,
  auditor,
}: AuditSummaryProps) {
  const getAuditCategoryName = (value: string) => {
    return auditCategories.find((c) => c.value === value)?.label || "";
  };

  const getAuditTypeName = (value: string) => {
    return auditTypes.find((t) => t.value === value)?.label || "";
  };

  const getFrequencyDescription = () => {
    switch (auditType) {
      case "daily":
        return `her ${customInterval} günde bir`;
      case "weekly":
        return `her ${auditFrequency}`;
      case "monthly":
        return selectedDate
          ? `her ayın ${format(selectedDate, "d", { locale: tr })}. günü`
          : "";
      default:
        return "";
    }
  };

  return (
    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-md">
      <p className="text-green-800 dark:text-green-200">
        Denetim ayarları: {getAuditCategoryName(auditCategory)} -{" "}
        {getAuditTypeName(auditType)}
        {auditType !== "unannounced" && ` ${getFrequencyDescription()}`}
        {auditor && ` - Denetçi: ${auditor}`}
      </p>
    </div>
  );
}
