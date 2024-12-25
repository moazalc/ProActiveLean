"use client";

import { useState } from "react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LocationOption } from "@/types/checklist";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Edit, Trash2, Plus, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

export default function ChecklistHavuzuPage() {
  const {
    checklists,
    createChecklist,
    updateChecklist,
    deleteChecklist,
    assignUser,
    addItem,
  } = useChecklistStore();

  const [filterLocation, setFilterLocation] = useState<LocationOption | "">("");
  const [filterUser, setFilterUser] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState<LocationOption | "">("");
  const [newDueDate, setNewDueDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState<LocationOption>("Katlar");
  const [editDueDate, setEditDueDate] = useState("");
  const [addItemChecklistId, setAddItemChecklistId] = useState<string | null>(
    null
  );
  const [itemLabels, setItemLabels] = useState("");

  const filteredChecklists = checklists.filter((cl) => {
    const matchLoc = filterLocation ? cl.location === filterLocation : true;
    const matchUser = filterUser ? cl.assignedUserId === filterUser : true;
    return matchLoc && matchUser;
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">
        Checklist Havuzu (Admin)
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Filtreler ve Yeni Checklist Oluştur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="location-filter">Lokasyon Filtre</Label>
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
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="user-filter">Kullanıcı Filtre</Label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger id="user-filter">
                  <SelectValue placeholder="Tümü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {mockUsers.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-title">Checklist Adı</Label>
                <Input
                  id="new-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="new-location">Lokasyon</Label>
                <Select
                  value={newLocation}
                  onValueChange={(value) =>
                    setNewLocation(value as LocationOption)
                  }
                >
                  <SelectTrigger id="new-location">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-due-date">Due Date</Label>
                <Input
                  id="new-due-date"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (!newTitle.trim() || !newLocation || !newDueDate) return;
                createChecklist(newTitle.trim(), newLocation, newDueDate);
                setNewTitle("");
                setNewLocation("");
                setNewDueDate("");
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Yeni Checklist Oluştur
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredChecklists.map((cl) => (
          <Card key={cl.id}>
            <CardHeader>
              <CardTitle>{cl.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingId === cl.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`edit-title-${cl.id}`}>Başlık</Label>
                    <Input
                      id={`edit-title-${cl.id}`}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edit-location-${cl.id}`}>Lokasyon</Label>
                    <Select
                      value={editLocation}
                      onValueChange={(value) =>
                        setEditLocation(value as LocationOption)
                      }
                    >
                      <SelectTrigger id={`edit-location-${cl.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locationOptions.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`edit-due-date-${cl.id}`}>Due Date</Label>
                    <Input
                      id={`edit-due-date-${cl.id}`}
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        if (!editTitle.trim() || !editDueDate) return;
                        updateChecklist(
                          cl.id,
                          editTitle.trim(),
                          editLocation,
                          editDueDate
                        );
                        setEditingId(null);
                      }}
                    >
                      Kaydet
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Vazgeç
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Lokasyon:</strong> {cl.location}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {cl.dueDate}
                  </p>
                  {cl.assignedUserId && (
                    <p>
                      <strong>Atanan:</strong>{" "}
                      {mockUsers.find((u) => u.id === cl.assignedUserId)?.name}
                    </p>
                  )}
                  <div>
                    <Label htmlFor={`assign-user-${cl.id}`}>
                      Çalışan Atama
                    </Label>
                    <Select
                      value={cl.assignedUserId || ""}
                      onValueChange={(value) => assignUser(cl.id, value)}
                    >
                      <SelectTrigger id={`assign-user-${cl.id}`}>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Seçiniz</SelectItem>
                        {mockUsers.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setAddItemChecklistId(cl.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Madde Ekle
                  </Button>
                  <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                    <ul className="list-disc list-inside space-y-1">
                      {cl.items.map((item) => (
                        <li key={item.id}>{item.label}</li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(cl.id);
                  setEditTitle(cl.title);
                  setEditLocation(cl.location || "Katlar");
                  setEditDueDate(cl.dueDate || "");
                }}
              >
                <Edit className="w-4 h-4 mr-2" /> Düzenle
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteChecklist(cl.id);
                  toast({
                    title: "Checklist Silindi",
                    description: "Checklist başarıyla silindi.",
                    variant: "destructive",
                  });
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Sil
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={Boolean(addItemChecklistId)}
        onOpenChange={() => setAddItemChecklistId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Maddeler Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="new-items">Maddeler</Label>
            <Textarea
              id="new-items"
              placeholder="Her satıra bir madde yazın..."
              value={itemLabels}
              onChange={(e) => setItemLabels(e.target.value)}
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!itemLabels.trim() || !addItemChecklistId) return;
                const lines = itemLabels
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean);
                lines.forEach((label) => addItem(addItemChecklistId, label));
                setItemLabels("");
                setAddItemChecklistId(null);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
