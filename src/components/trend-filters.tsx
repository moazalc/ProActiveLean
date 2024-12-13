"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data - replace with your actual data
const departments = ["IT", "HR", "Production", "Quality", "Maintenance"];
const areas = ["Area 1", "Area 2", "Area 3", "Area 4", "Area 5"];
const years = ["2023", "2024"];
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

interface TrendFiltersProps {
  onFilterChange: (filters: {
    department: string;
    area: string;
    year: string;
    startMonth: string;
    endMonth: string;
  }) => void;
}

export function TrendFilters({ onFilterChange }: TrendFiltersProps) {
  const [filters, setFilters] = useState({
    department: departments[0],
    area: areas[0],
    year: years[0],
    startMonth: months[0],
    endMonth: months[11],
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
        defaultValue={filters.department}
        onValueChange={(value) => handleFilterChange("department", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Departman Seç" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filters.area}
        onValueChange={(value) => handleFilterChange("area", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Alan Seç" />
        </SelectTrigger>
        <SelectContent>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filters.year}
        onValueChange={(value) => handleFilterChange("year", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Yıl Seç" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filters.startMonth}
        onValueChange={(value) => handleFilterChange("startMonth", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Başlangıç Ayı" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filters.endMonth}
        onValueChange={(value) => handleFilterChange("endMonth", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bitiş Ayı" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
