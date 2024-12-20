import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

interface AuditFrequencySelectProps {
  auditType: string;
  auditFrequency: string;
  customInterval: string;
  selectedDate: Date | undefined;
  onAuditFrequencyChange: (value: string) => void;
  onCustomIntervalChange: (value: string) => void;
  onSelectedDateChange: (date: Date | undefined) => void;
}

export function AuditFrequencySelect({
  auditType,
  auditFrequency,
  customInterval,
  selectedDate,
  onAuditFrequencyChange,
  onCustomIntervalChange,
  onSelectedDateChange,
}: AuditFrequencySelectProps) {
  const renderFrequencyOptions = () => {
    switch (auditType) {
      case "monthly":
        return (
          <div className="flex flex-col space-y-2">
            <Label htmlFor="monthlyDate">Ayın Günü</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !selectedDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: tr })
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onSelectedDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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
      <Label
        htmlFor="auditFrequency"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Periyodik Denetim Frekansı
      </Label>
      {renderFrequencyOptions()}
    </div>
  );
}
