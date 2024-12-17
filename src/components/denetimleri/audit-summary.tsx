const auditTypes = [
    { value: "monthly", label: "Aylık Denetim" },
    { value: "weekly", label: "Haftalık Denetim" },
    { value: "daily", label: "Günlük Denetim" },
    { value: "unannounced", label: "Anlık Denetim" },
  ];
  
  interface AuditSummaryProps {
    auditType: string;
    auditFrequency: string;
    customInterval: string;
  }
  
  export function AuditSummary({ auditType, auditFrequency, customInterval }: AuditSummaryProps) {
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
          if (auditFrequency === "last") {
            return "ayın son günü";
          } else {
            return `ayın ${auditFrequency}. günü`;
          }
        default:
          return "";
      }
    };
  
    return (
      <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-md">
        <p className="text-green-800 dark:text-green-200">
          Denetim ayarları: {getAuditTypeName(auditType)}
          {auditType !== "unannounced" && ` ${getFrequencyDescription()}`}
        </p>
      </div>
    );
  }
  
  