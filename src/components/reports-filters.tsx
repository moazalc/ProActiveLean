import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ReportsFilters() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex gap-4">
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ay Seç" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Ocak</SelectItem>
          <SelectItem value="2">Şubat</SelectItem>
          <SelectItem value="3">Mart</SelectItem>
          <SelectItem value="4">Nisan</SelectItem>
          <SelectItem value="5">Mayıs</SelectItem>
          <SelectItem value="6">Haziran</SelectItem>
          <SelectItem value="7">Temmuz</SelectItem>
          <SelectItem value="8">Ağustos</SelectItem>
          <SelectItem value="9">Eylül</SelectItem>
          <SelectItem value="10">Ekim</SelectItem>
          <SelectItem value="11">Kasım</SelectItem>
          <SelectItem value="12">Aralık</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Konum Seç" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="location1">Konum 1</SelectItem>
          <SelectItem value="location2">Konum 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
