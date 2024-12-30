"use client";

import React, { useState, useEffect } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { useSoruHavuzuStore } from "@/store/useSoruHavuzuStore";
import { useChecklistStore } from "@/store/useChecklistStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AuditQuestion } from "@/types/audits";
import {
  PlusCircle,
  CheckCircle,
  X,
  Trash2,
  Calendar,
  User,
  MapPin,
  Loader,
  CalendarX2,
} from "lucide-react";
import AuditQuestionCard from "./AuditQuestionCard";

// Example auditors for selection
const mockAuditors = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Ayşe" },
  { id: "3", name: "Mehmet" },
];

// Example locations for selection
const mockLocations = ["", "Katlar", "Mutfak", "Bahçe", "Lobi"];

/** Helper to get auditor name by ID. */
function getAuditorNameById(id: string): string {
  const found = mockAuditors.find((aud) => aud.id === id);
  return found ? found.name : `Denetçi #${id}`; // Fallback if not found
}

export default function DenetimlerPage() {
  const { audits, createAudit, finishAudit, deleteAudit } = useAuditStore();
  const { checklists } = useChecklistStore();
  const { categories } = useSoruHavuzuStore();
  const { toast } = useToast();

  // Fields for creating a new audit
  const [selectedChecklistId, setSelectedChecklistId] = useState("");
  const [selectedAuditorId, setSelectedAuditorId] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);

  // Show/hide confirmation dialog for delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [auditToDelete, setAuditToDelete] = useState<string | null>(null);

  // Filters
  const [filterAuditor, setFilterAuditor] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Stats
  const [statCompleted, setStatCompleted] = useState(0);
  const [statNotStarted, setStatNotStarted] = useState(0);
  const [statExpired, setStatExpired] = useState(0);

  // We only allow creating audits from "completed" checklists
  const completedChecklists = checklists.filter((cl) => cl.completed);

  // We'll compute filtered audits in a local state
  const [filteredAudits, setFilteredAudits] = useState(audits);

  // Recompute filtered audits + stats whenever audits or filter changes
  useEffect(() => {
    let temp = [...audits];

    // Filter by location
    if (filterLocation && filterLocation !== "all") {
      temp = temp.filter((a) => a.location === filterLocation);
    }

    // Filter by auditor
    if (filterAuditor && filterAuditor !== "all") {
      temp = temp.filter((a) => a.assignedAuditorId === filterAuditor);
    }

    // Now compute stats:
    let completedCount = 0;
    let notStartedCount = 0;
    let expiredCount = 0;

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    temp.forEach((audit) => {
      // Completed
      if (audit.completed) completedCount++;

      // Not Started = none of the main or sub-questions answered
      const totalQuestions = audit.questions.length;
      let answeredCount = 0;
      audit.questions.forEach((q) => {
        // If we’re using "YES"|"NO"|"NA", then "answered" means q.answer != undefined
        if (q.answer) answeredCount++;
        if (q.subQuestions) {
          q.subQuestions.forEach((sq) => {
            if (sq.answer) answeredCount++;
          });
        }
      });
      if (answeredCount === 0 && !audit.completed) {
        notStartedCount++;
      }

      // Expired = dueDate < today, not completed
      if (!audit.completed && audit.dueDate && audit.dueDate < today) {
        expiredCount++;
      }
    });

    setStatCompleted(completedCount);
    setStatNotStarted(notStartedCount);
    setStatExpired(expiredCount);

    setFilteredAudits(temp);
  }, [audits, filterLocation, filterAuditor]);

  /** CREATE AUDIT Handler */
  const handleCreateAudit = () => {
    if (!selectedChecklistId || !selectedAuditorId || !dueDate) return;

    // 1) Find the chosen checklist
    const checklist = checklists.find((cl) => cl.id === selectedChecklistId);
    if (!checklist) return;

    // 2) Gather questions from Soru Havuzu, repeated for each item in the checklist
    const allQuestions: AuditQuestion[] = [];
    categories.forEach((cat) => {
      cat.mainQuestions.forEach((mq) => {
        checklist.items.forEach((item) => {
          // Build subQuestions array
          let subQs = undefined;
          if (mq.subQuestions && mq.subQuestions.length > 0) {
            subQs = mq.subQuestions.map((subq) => ({
              id: subq.id,
              text: subq.questionText,
              answer: undefined, // was answered: false
            }));
          }

          allQuestions.push({
            id: crypto.randomUUID(),
            text: mq.questionText,
            category: cat.category,
            itemLabel: item.label,
            answer: undefined, // was answered: false
            subQuestions: subQs,
          });
        });
      });
    });

    // 3) Create the new audit in Zustand
    createAudit(
      selectedChecklistId,
      selectedAuditorId,
      selectedLocation,
      dueDate,
      allQuestions
    );

    // Clear the form
    setSelectedChecklistId("");
    setSelectedAuditorId("");
    setSelectedLocation("");
    setDueDate("");
    setCreateDialogOpen(false);

    toast({
      title: "Denetim Oluşturuldu",
      description: "Yeni denetim başarıyla oluşturuldu.",
      duration: 3000,
    });
  };

  // Helper to get the Checklist name for an Audit
  const getChecklistTitle = (checklistId: string) => {
    const cl = checklists.find((c) => c.id === checklistId);
    return cl ? cl.title : "Untitled";
  };

  /** DELETE Confirm Handler */
  const handleConfirmDelete = () => {
    if (!auditToDelete) return;
    deleteAudit(auditToDelete);
    setShowDeleteConfirm(false);
    setAuditToDelete(null);
    toast({
      title: "Denetim Silindi",
      description: "Denetim başarıyla silindi.",
      variant: "destructive",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Denetimler</h1>

      {/* Filtreler & İstatistikler */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Filtreler ve İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end mb-4">
              <div>
                <Label>Lokasyon</Label>
                <Select
                  value={filterLocation}
                  onValueChange={setFilterLocation}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lokasyon Filtre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hepsi</SelectItem>
                    {mockLocations
                      .filter((loc) => loc !== "")
                      .map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Denetçi</Label>
                <Select value={filterAuditor} onValueChange={setFilterAuditor}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Denetçi Filtre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hepsi</SelectItem>
                    {mockAuditors.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-around">
              <StatBox
                title="Tamamlanmış"
                value={statCompleted}
                color="bg-green-200"
              />
              <StatBox
                title="Başlanmamış"
                value={statNotStarted}
                color="bg-yellow-200"
              />
              <StatBox
                title="Süresi Geçmiş"
                value={statExpired}
                color="bg-red-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Yeni Denetim Card */}
        <Card>
          <CardHeader>
            <CardTitle>Yeni Denetim</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Denetim Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Denetim Oluştur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bitmiş Checklist Seç</Label>
                    <Select
                      value={selectedChecklistId}
                      onValueChange={setSelectedChecklistId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Checklist seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {completedChecklists.map((cl) => (
                          <SelectItem key={cl.id} value={cl.id}>
                            {cl.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Denetçi Seç</Label>
                    <Select
                      value={selectedAuditorId}
                      onValueChange={setSelectedAuditorId}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label>Lokasyon</Label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Lokasyon seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Seçiniz</SelectItem>
                        {mockLocations
                          .filter((loc) => loc !== "")
                          .map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCreateAudit} className="w-full">
                    Oluştur
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Audits List */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAudits.map((audit) => {
          const isCompleted = audit.completed;
          const today = new Date().toISOString().split("T")[0];
          const expired = !isCompleted && audit.dueDate < today;

          // (B) We'll use the checklist title to name the audit, e.g. "Odalar Audit"
          const checklistTitle = getChecklistTitle(audit.checklistId);
          const auditorName = getAuditorNameById(audit.assignedAuditorId);

          return (
            <Card key={audit.id} className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {/* 2) Show "Odalar Audit" or similar */}
                  <span className="text-sm font-semibold">
                    {checklistTitle} Audit
                  </span>

                  {/* Status */}
                  {isCompleted ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" />
                      <span className="text-green-500">Tamamlandı</span>
                    </div>
                  ) : expired ? (
                    <div className="flex items-center space-x-2">
                      <CalendarX2 className="text-red-500" />
                      <span className="text-red-500">Süresi Geçmiş</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Loader className="text-yellow-500" />
                      <span className="text-yellow-500">Devam Ediyor</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* (1) Show Denetçi name + Sorumlu name */}
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    <strong>Denetçi:</strong> {auditorName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    <strong>Sorumlu:</strong> {audit.createdBy}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{audit.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{audit.dueDate}</span>
                </div>

                <p className="text-sm font-medium">
                  {/* Show truncated audit ID if desired */}
                  Audit ID: {audit.id.slice(0, 8)}
                </p>

                <p className="text-sm">
                  Durum:{" "}
                  {isCompleted
                    ? "Tamamlandı"
                    : expired
                    ? "Süresi Geçmiş"
                    : "Devam Ediyor"}
                </p>
              </CardContent>
              <CardFooter className="flex-col sm:flex-row gap-2">
                {/* (4) If completed -> “Denetimi Görüntüle” else “Denetim Başlat” */}
                {isCompleted ? (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAuditId(audit.id)}
                  >
                    Denetimi Görüntüle
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAuditId(audit.id)}
                  >
                    Denetim Başlat
                  </Button>
                )}

                {/* If not completed -> “Denetimi Bitir” */}
                {!isCompleted && (
                  <Button
                    onClick={() => {
                      finishAudit(audit.id);
                      toast({
                        title: "Denetim Tamamlandı",
                        description: "Denetim başarıyla tamamlandı.",
                        duration: 3000,
                      });
                    }}
                  >
                    Denetimi Bitir
                  </Button>
                )}

                {/* (3) Delete with confirmation dialog */}
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setAuditToDelete(audit.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredAudits.length === 0 && (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-lg font-medium text-muted-foreground">
              Seçilen filtrelere göre denetim bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}

      {/* (3) Confirmation Dialog for deleting an Audit */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Denetim Sil</DialogTitle>
          </DialogHeader>
          <p>Bu denetimi silmek istediğinizden emin misiniz?</p>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Vazgeç
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Sil
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* The question card (read/write) */}
      {selectedAuditId && (
        <AuditQuestionCard
          auditId={selectedAuditId}
          onClose={() => setSelectedAuditId(null)}
        />
      )}

      <Toaster />
    </div>
  );
}

/** Simple stat box for your counts */
function StatBox({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`w-32 h-16 rounded flex flex-col items-center justify-center ${color}`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
