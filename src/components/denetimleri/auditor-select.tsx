import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const users = [
  { id: "1", name: "Ahmet Yılmaz" },
  { id: "2", name: "Ayşe Demir" },
  { id: "3", name: "Mehmet Kaya" },
  { id: "4", name: "Fatma Çelik" },
];

interface AuditorSelectProps {
  auditor: string;
  onAuditorChange: (value: string) => void;
}

export function AuditorSelect({
  auditor,
  onAuditorChange,
}: AuditorSelectProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="auditor"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Denetçi
      </Label>
      <Select value={auditor} onValueChange={onAuditorChange}>
        <SelectTrigger id="auditor" className="w-full">
          <SelectValue placeholder="Denetçi Seçiniz" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
