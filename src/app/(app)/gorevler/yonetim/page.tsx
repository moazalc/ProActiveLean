"use client";

import React, { useState, useMemo } from "react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationOption } from "@/types/checklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  User,
  CheckSquare,
  Square,
  MessageSquare,
  Image,
} from "lucide-react";

// Example users for Person filter
const mockUsers = [
  { id: "all", name: "Tümü" }, // for "show all"
  { id: "1", name: "Ali" },
  { id: "2", name: "Ayşe" },
  { id: "3", name: "Mehmet" },
];

// Example location options for Location filter
const locationOptions: Array<LocationOption | "all"> = [
  "all",
  "Katlar",
  "Lobi",
  "Restoran",
  "Bahçe",
  "Bolum",
  "Havuz",
  "Toplantı odalar",
  "Tuvaletler",
];

export default function ChecklistManagerPage() {
  const { checklists } = useChecklistStore();

  // Only show completed checklists
  const completedChecklists = checklists.filter((cl) => cl.completed);

  // ---- FILTER STATES ----
  // 1) Month/Year filter (time)
  const [monthYearFilter, setMonthYearFilter] = useState("");
  // 2) Person filter (worker)
  const [personFilter, setPersonFilter] = useState("all");
  // 3) Location filter
  const [filterLocation, setFilterLocation] = useState<LocationOption | "all">(
    "all"
  );

  // ---- FILTER HELPER: check if a checklist's dueDate (YYYY-MM-DD)
  // starts with the selected month-year (YYYY-MM)
  const matchesMonthYear = (dueDate?: string, selected?: string) => {
    if (!dueDate || !selected) return true; // if no dueDate or no filter, pass
    // e.g. dueDate "2025-04-15", selected "2025-04"
    return dueDate.startsWith(selected);
  };

  // ---- FILTER LOGIC ----
  const filtered = useMemo(() => {
    let temp = [...completedChecklists];

    // 1) MonthYear filter
    if (monthYearFilter) {
      temp = temp.filter((cl) => matchesMonthYear(cl.dueDate, monthYearFilter));
    }

    // 2) Person filter
    if (personFilter !== "all") {
      temp = temp.filter((cl) => cl.assignedUserId === personFilter);
    }

    // 3) Location filter
    if (filterLocation !== "all") {
      temp = temp.filter((cl) => cl.location === filterLocation);
    }

    return temp;
  }, [completedChecklists, monthYearFilter, personFilter, filterLocation]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Görevler Yönetim</h1>

      {/* FILTER CARD */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Filtrele</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 1) Month/Year Filter */}
            <div className="flex flex-col">
              <Label>Ay / Yıl</Label>
              <Input
                type="month"
                value={monthYearFilter}
                onChange={(e) => setMonthYearFilter(e.target.value)}
              />
            </div>

            {/* 2) Person Filter */}
            <div className="flex flex-col">
              <Label>Kişi (Görevi Yapan)</Label>
              <Select
                value={personFilter}
                onValueChange={(val) => setPersonFilter(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 3) Location Filter */}
            <div className="flex flex-col">
              <Label>Lokasyon</Label>
              <Select
                value={filterLocation}
                onValueChange={(value) =>
                  setFilterLocation(value as LocationOption | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === "all" ? "Tümü" : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DISPLAY FILTERED CHECKLISTS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cl) => {
          const user = mockUsers.find((u) => u.id === cl.assignedUserId);

          return (
            <Card key={cl.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{cl.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* Location */}
                  {cl.location && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      {cl.location}
                    </Badge>
                  )}
                  {/* Due Date */}
                  {cl.dueDate && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      {cl.dueDate}
                    </Badge>
                  )}
                  {/* Assigned User */}
                  {user && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <User className="w-3 h-3" />
                      {user.name}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Puan: {cl.score ?? 0}</p>
                  <p className="text-sm">
                    Toplam Madde: {cl.items.length} | İşaretlenen:{" "}
                    {cl.items.filter((i) => i.checked).length}
                  </p>
                  <Separator />
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {cl.items.map((item) => (
                        <div key={item.id} className="space-y-2">
                          {/* Label + checked icon */}
                          <div className="flex items-start gap-2">
                            {item.checked ? (
                              <CheckSquare className="w-5 h-5 text-primary" />
                            ) : (
                              <Square className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className="font-medium">{item.label}</span>
                          </div>

                          {/* Comment */}
                          {item.comment && (
                            <div className="flex items-start gap-2 ml-7 text-sm text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              <span>{item.comment}</span>
                            </div>
                          )}

                          {/* Photos (Now an array) */}
                          {item.photos && item.photos.length > 0 && (
                            <div className="ml-7 space-y-2">
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Image className="w-3 h-3" />
                                Fotoğraflar
                              </Badge>
                              <div className="flex flex-wrap gap-2">
                                {item.photos.map((photo, idx) => (
                                  <img
                                    key={idx}
                                    src={photo}
                                    alt="User photo"
                                    className="max-h-32 rounded-md"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-lg font-medium text-muted-foreground">
              Henüz tamamlanmış checklist bulunamadı.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
