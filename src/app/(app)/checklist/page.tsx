"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChecklistGrid } from "@/components/checklist/checklist-grid";
import { mockChecklists } from "./mock-data";

export default function MyChecklists() {
  const [checklists, setChecklists] = useState(mockChecklists);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredChecklists = checklists.filter(
    (checklist) =>
      (filters.status ? checklist.status === filters.status : true) &&
      (filters.priority ? checklist.priority === filters.priority : true) &&
      (filters.search
        ? checklist.title.toLowerCase().includes(filters.search.toLowerCase())
        : true)
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Checklists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="status-filter">Durum</Label>
              <Select
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Durum Seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="overdue">Gecikmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="prioriAty-filter">Öncelik</Label>
              <Select
                onValueChange={(value) => handleFilterChange("priority", value)}
              >
                <SelectTrigger id="priority-filter">
                  <SelectValue placeholder="Öncelik Seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                  <SelectItem value="medium">Orta</SelectItem>
                  <SelectItem value="low">Düşük</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="search">Ara</Label>
              <Input
                id="search"
                placeholder="Kontrol listesi ara..."
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>
          <ChecklistGrid checklists={filteredChecklists} />
        </CardContent>
      </Card>
    </div>
  );
}
