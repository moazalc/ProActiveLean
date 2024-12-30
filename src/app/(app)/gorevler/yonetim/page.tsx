"use client";

import React, { useState } from "react";
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

const mockUsers = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Ayşe" },
  { id: "3", name: "Mehmet" },
];

const locationOptions: LocationOption[] = [
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

  // Filter by location
  const [filterLocation, setFilterLocation] = useState<LocationOption | "">("");

  const filtered = completedChecklists.filter((cl) =>
    filterLocation ? cl.location === filterLocation : true
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Checklist Yönetim</h1>

      {/* LOCATION FILTER */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Filtrele</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location-filter">Lokasyon</Label>
            <Select
              value={filterLocation}
              onValueChange={(value) =>
                setFilterLocation(value as LocationOption | "")
              }
            >
              <SelectTrigger id="location-filter">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                {locationOptions.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cl) => {
          const user = mockUsers.find((u) => u.id === cl.assignedUserId);
          return (
            <Card key={cl.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{cl.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {cl.location}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    {cl.dueDate}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <User className="w-3 h-3" />
                    {user ? user.name : "N/A"}
                  </Badge>
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
                          <div className="flex items-start gap-2">
                            {item.checked ? (
                              <CheckSquare className="w-5 h-5 text-primary" />
                            ) : (
                              <Square className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.comment && (
                            <div className="flex items-start gap-2 ml-7 text-sm text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              <span>{item.comment}</span>
                            </div>
                          )}
                          {item.photo && (
                            <div className="ml-7">
                              <Badge
                                variant="outline"
                                className="mb-2 flex items-center gap-1"
                              >
                                <Image className="w-3 h-3" />
                                Fotoğraf
                              </Badge>
                              <img
                                src={item.photo}
                                alt="User photo"
                                className="max-h-32 rounded-md"
                              />
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
