"use client";

import React, { useState } from "react";
import { useAuditSettingsStore } from "@/store/useAuditSettingsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuditFrequency } from "@/types/auditsetting";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Calendar, User, Edit, Trash2, Plus, Check } from "lucide-react";

const mockAuditors = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Ayşe" },
  { id: "3", name: "Mehmet" },
];

export default function DenetimAyarlarıPage() {
  const { settings, createSetting, updateSetting, deleteSetting } =
    useAuditSettingsStore();
  const { toast } = useToast();

  // Form states
  const [frequency, setFrequency] = useState<AuditFrequency>("daily");
  const [assignedAuditorId, setAssignedAuditorId] = useState("");
  const [dailyInterval, setDailyInterval] = useState<number>(1);
  const [weeklyDay, setWeeklyDay] = useState<number>(1);
  const [monthlyDay, setMonthlyDay] = useState<number>(1);

  // For editing
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter out the data for the edit form
  const editingRecord = editingId
    ? settings.find((s) => s.id === editingId)
    : null;

  // Handle create
  const handleCreate = () => {
    if (!assignedAuditorId) return;
    // We pass the relevant day/interval based on frequency
    createSetting(
      frequency,
      assignedAuditorId,
      frequency === "daily" ? dailyInterval : undefined,
      frequency === "weekly" ? weeklyDay : undefined,
      frequency === "monthly" ? monthlyDay : undefined
    );
    // reset
    setFrequency("daily");
    setAssignedAuditorId("");
    setDailyInterval(1);
    setWeeklyDay(1);
    setMonthlyDay(1);
    toast({
      title: "Ayar Oluşturuldu",
      description: "Yeni denetim ayarı başarıyla oluşturuldu.",
      duration: 3000,
    });
  };

  // Handle update
  const handleUpdate = () => {
    if (!editingRecord || !assignedAuditorId) return;
    updateSetting(
      editingRecord.id,
      frequency,
      assignedAuditorId,
      frequency === "daily" ? dailyInterval : undefined,
      frequency === "weekly" ? weeklyDay : undefined,
      frequency === "monthly" ? monthlyDay : undefined
    );
    setEditingId(null);
    // reset form
    setFrequency("daily");
    setAssignedAuditorId("");
    setDailyInterval(1);
    setWeeklyDay(1);
    setMonthlyDay(1);
    toast({
      title: "Ayar Güncellendi",
      description: "Denetim ayarı başarıyla güncellendi.",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Denetim Ayarları</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            {editingId ? "Ayarı Düzenle" : "Yeni Ayar Oluştur"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Denetim Tipi</Label>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as AuditFrequency)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Denetim tipi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Günlük </SelectItem>
                <SelectItem value="weekly">Haftalık</SelectItem>
                <SelectItem value="monthly">Aylık</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {frequency === "daily" && (
            <div className="space-y-2">
              <Label htmlFor="dailyInterval">Kaç günde bir?</Label>
              <Input
                id="dailyInterval"
                type="number"
                value={dailyInterval}
                onChange={(e) => setDailyInterval(Number(e.target.value))}
                min={1}
              />
            </div>
          )}
          {frequency === "weekly" && (
            <div className="space-y-2">
              <Label htmlFor="weeklyDay">
                Haftanın Kaçıncı Günü? (1=Pazartesi ... 7=Pazar)
              </Label>
              <Input
                id="weeklyDay"
                type="number"
                value={weeklyDay}
                onChange={(e) => setWeeklyDay(Number(e.target.value))}
                min={1}
                max={7}
              />
            </div>
          )}
          {frequency === "monthly" && (
            <div className="space-y-2">
              <Label htmlFor="monthlyDay">Ayın Kaçıncı Günü? (1-31)</Label>
              <Input
                id="monthlyDay"
                type="number"
                value={monthlyDay}
                onChange={(e) => setMonthlyDay(Number(e.target.value))}
                min={1}
                max={31}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="auditor">Sorumlu Denetçi</Label>
            <Select
              value={assignedAuditorId}
              onValueChange={setAssignedAuditorId}
            >
              <SelectTrigger id="auditor">
                <SelectValue placeholder="Denetçi seçin" />
              </SelectTrigger>
              <SelectContent>
                {mockAuditors.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          {!editingId ? (
            <Button onClick={handleCreate} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Ayar Oluştur
            </Button>
          ) : (
            <Button onClick={handleUpdate} className="w-full">
              <Check className="w-4 h-4 mr-2" /> Ayarı Güncelle
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settings.map((s) => {
          const auditor = mockAuditors.find(
            (a) => a.id === s.assignedAuditorId
          );
          return (
            <Card key={s.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {s.frequency.charAt(0).toUpperCase() + s.frequency.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {s.frequency === "daily" && (
                  <p>Her {s.dailyInterval} günde bir</p>
                )}
                {s.frequency === "weekly" && (
                  <p>Haftanın {s.weeklyDay}. günü</p>
                )}
                {s.frequency === "monthly" && <p>Ayın {s.monthlyDay}. günü</p>}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <p>Sorumlu Denetçi: {auditor ? auditor.name : "N/A"}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(s.id);
                    setFrequency(s.frequency);
                    setAssignedAuditorId(s.assignedAuditorId);
                    if (s.dailyInterval) setDailyInterval(s.dailyInterval);
                    if (s.weeklyDay) setWeeklyDay(s.weeklyDay);
                    if (s.monthlyDay) setMonthlyDay(s.monthlyDay);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" /> Düzenle
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    deleteSetting(s.id);
                    toast({
                      title: "Ayar Silindi",
                      description: "Denetim ayarı başarıyla silindi.",
                      variant: "destructive",
                      duration: 3000,
                    });
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Sil
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Toaster />
    </div>
  );
}
