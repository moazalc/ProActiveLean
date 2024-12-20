import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const monthlyOptions = [
  { value: "1", label: "Ayın ilk günü" },
  { value: "15", label: "Ayın 15. günü" },
  { value: "last", label: "Ayın son günü" },
];

interface AuditFrequencySelectProps {
  auditType: string;
  auditFrequency: string;
  customInterval: string;
  onAuditFrequencyChange: (value: string) => void;
  onCustomIntervalChange: (value: string) => void;
}

export function AuditFrequencySelect({
  auditType,
  auditFrequency,
  customInterval,
  onAuditFrequencyChange,
  onCustomIntervalChange,
}: AuditFrequencySelectProps) {
  const renderFrequencyOptions = () => {
    switch (auditType) {
      case "monthly":
        return (
          <Select value={auditFrequency} onValueChange={onAuditFrequencyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ayın gününü seçin" />
            </SelectTrigger>
            <SelectContent>
              {monthlyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "weekly":
        return (
          <Select value={auditFrequency} onValueChange={onAuditFrequencyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Haftanın Gününü Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day.toLowerCase()} value={day.toLowerCase()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "daily":
        return (
          <div className="flex items-center space-x-2">
            <Label htmlFor="customInterval">Her</Label>
            <Input
              id="customInterval"
              type="number"
              min="1"
              value={customInterval}
              onChange={(e) => onCustomIntervalChange(e.target.value)}
              className="w-20"
            />
            <span>Gün</span>
          </div>
        );
      case "unannounced":
        return (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sıklık, habersiz denetimler için geçerli değildir.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="auditFrequency" className="text-sm font-medium text-gray-700 dark:text-gray-300">Periyodik Denetim Frekansı</Label>
      {renderFrequencyOptions()}
    </div>
  );
}

