import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Location, User } from "@/types/audit";

interface AuditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (auditData: any) => void;
  editingAudit: any | null;
  locations: Location[];
  users: User[];
}

export function AuditDialog({
  isOpen,
  onOpenChange,
  onSave,
  editingAudit,
  locations,
  users,
}: AuditDialogProps) {
  const [newAudit, setNewAudit] = useState(
    editingAudit || {
      locationCategoryId: "",
      denetci: "",
      status: "Yapılacaklar",
      questionCount: 0,
      yesCount: 0,
    }
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    editingAudit?.denetimTarihi
      ? new Date(editingAudit.denetimTarihi)
      : undefined
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSaveAudit = () => {
    if (!newAudit.locationCategoryId || !newAudit.denetci || !selectedDate) {
      return;
    }

    onSave({
      ...newAudit,
      dateDue: selectedDate,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>
            {editingAudit ? "Denetim Düzenle" : "Yeni Denetim Ekle"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Lokasyon Kategorisi
            </label>
            <Select
              value={newAudit.locationCategoryId}
              onValueChange={(value) =>
                setNewAudit({ ...newAudit, locationCategoryId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Lokasyon seç" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Denetçi
            </label>
            <Select
              value={newAudit.denetci}
              onValueChange={(value) =>
                setNewAudit({ ...newAudit, denetci: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Bir Denetçi seç" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Denetim Tarihi
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                    !selectedDate && "text-muted-foreground"
                  )}
                  onClick={() => setIsCalendarOpen(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Tarih seç"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={handleSaveAudit}
          >
            {editingAudit ? "Güncelle" : "Ekle"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
