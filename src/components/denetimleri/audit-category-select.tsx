import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const auditCategories = [
  { value: "temizlik", label: "Temizlik" },
  { value: "duzen", label: "Düzen" },
  { value: "bolum-periyodik", label: "Bölüm Periyodik" },
  { value: "kontroller", label: "Kontroller" },
];

interface AuditCategorySelectProps {
  auditCategory: string;
  onAuditCategoryChange: (value: string) => void;
}

export function AuditCategorySelect({
  auditCategory,
  onAuditCategoryChange,
}: AuditCategorySelectProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="auditCategory"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Denetim Kategorisi
      </Label>
      <Select value={auditCategory} onValueChange={onAuditCategoryChange}>
        <SelectTrigger id="auditCategory" className="w-full">
          <SelectValue placeholder="Denetim Kategorisini Seçiniz" />
        </SelectTrigger>
        <SelectContent>
          {auditCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
