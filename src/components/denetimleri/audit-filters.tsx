import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

interface AuditFiltersProps {
  filterMonth: Date | undefined;
  setFilterMonth: (date: Date | undefined) => void;
  filterLocation: string;
  setFilterLocation: (location: string) => void;
  filterAuditor: string;
  setFilterAuditor: (auditor: string) => void;
  locations: Location[];
  users: User[];
}

export function AuditFilters({
  filterMonth,
  setFilterMonth,
  filterLocation,
  setFilterLocation,
  filterAuditor,
  setFilterAuditor,
  locations,
  users,
}: AuditFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Ay
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !filterMonth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterMonth ? format(filterMonth, "MMMM yyyy") : "Ay seç"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterMonth}
              onSelect={setFilterMonth}
              initialFocus
              className="rounded-md border dark:border-gray-700"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Lokasyon
        </label>
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tüm Lokasyonlar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Tüm Lokasyonlar</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Denetçi
        </label>
        <Select value={filterAuditor} onValueChange={setFilterAuditor}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tüm Denetçiler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Tüm Denetçiler</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
