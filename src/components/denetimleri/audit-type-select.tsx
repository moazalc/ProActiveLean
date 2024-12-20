import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const auditTypes = [
  { value: "monthly", label: "Aylık Denetim" },
  { value: "weekly", label: "Haftalık Denetim" },
  { value: "daily", label: "Günlük Denetim" },
  { value: "unannounced", label: "Anlık Denetim" },
];

interface AuditTypeSelectProps {
  auditType: string;
  onAuditTypeChange: (value: string) => void;
}

export function AuditTypeSelect({ auditType, onAuditTypeChange }: AuditTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="auditType" className="text-sm font-medium text-gray-700 dark:text-gray-300">Denetim Türü</Label>
      <Select value={auditType} onValueChange={onAuditTypeChange}>
        <SelectTrigger id="auditType" className="w-full">
          <SelectValue placeholder="Denetim Türünü Seçiniz" />
        </SelectTrigger>
        <SelectContent>
          {auditTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

