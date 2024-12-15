"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Area } from "@/types/questions";

interface QuestionFilterProps {
  areas: Area[];
  selectedArea: string | null;
  onAreaChange: (areaId: string | null) => void;
}

export function QuestionFilter({
  areas,
  selectedArea,
  onAreaChange,
}: QuestionFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <Select
        value={selectedArea || ""}
        onValueChange={(value) => onAreaChange(value || null)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Alan seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Alanlar</SelectItem>
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.id}>
              {area.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedArea && (
        <Button variant="ghost" onClick={() => onAreaChange(null)}>
          Filtreyi Temizle
        </Button>
      )}
    </div>
  );
}
