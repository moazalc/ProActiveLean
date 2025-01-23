"use client";

import React, { useState, useMemo } from "react";
import {
  useFindingStore,
  FindingStatus,
  FindingType,
} from "@/store/useFindingStore";
import { useChecklistStore } from "@/store/useChecklistStore";
import { LocationOption } from "@/types/checklist";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import {
  MoreVertical,
  X,
  Edit,
  PlusCircle,
  Users,
  Clock,
  Copy,
  Aperture,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Circle,
  CalendarX2,
  Loader2,
  CheckCircle2,
  Maximize2,
} from "lucide-react";

// -----------------------------------------------------------------------------
// 1) Constants and Helpers
// -----------------------------------------------------------------------------

const locationOptions = [
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

const statusOptions: FindingStatus[] = [
  "Açık",
  "Tarihi Geçmiş",
  "Onay bekleyen",
  "Tamamlandı",
];

function isoToDateOnly(isoStr?: string) {
  if (!isoStr) return "";
  return isoStr.split("T")[0];
}

function getStatusDisplay(status: FindingStatus) {
  switch (status) {
    case "Açık":
      return {
        icon: <Circle className="text-gray-500 w-4 h-4 mr-1" />,
        colorClass: "text-gray-600",
      };
    case "Tarihi Geçmiş":
      return {
        icon: <CalendarX2 className="text-red-500 w-4 h-4 mr-1" />,
        colorClass: "text-red-500",
      };
    case "Onay bekleyen":
      return {
        icon: <Loader2 className="text-yellow-500 w-4 h-4 mr-1 animate-spin" />,
        colorClass: "text-yellow-500",
      };
    case "Tamamlandı":
      return {
        icon: <CheckCircle2 className="text-green-500 w-4 h-4 mr-1" />,
        colorClass: "text-green-500",
      };
    default:
      return { icon: null, colorClass: "" };
  }
}

// -----------------------------------------------------------------------------
// 2) Main BulgularPage
// -----------------------------------------------------------------------------

export default function BulgularPage() {
  const { findings } = useFindingStore();

  const [tab, setTab] = useState<"gorev" | "denetim">("gorev");
  const [statusFilter, setStatusFilter] = useState<"all" | FindingStatus>(
    "all"
  );
  const [monthYearFilter, setMonthYearFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredFindings = useMemo(() => {
    let data = findings.filter((f) =>
      tab === "gorev" ? f.type === "Görev" : f.type === "Denetim"
    );

    if (statusFilter !== "all") {
      data = data.filter((f) => f.status === statusFilter);
    }
    if (monthYearFilter) {
      data = data.filter((f) => f.createdAt.startsWith(monthYearFilter));
    }
    if (locationFilter !== "all") {
      data = data.filter((f) => f.location === locationFilter);
    }
    return data;
  }, [findings, tab, statusFilter, monthYearFilter, locationFilter]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Bulgular</h1>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "gorev" | "denetim")}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="gorev">Görevler Bulguları</TabsTrigger>
          <TabsTrigger value="denetim">Denetim Bulguları</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-4 items-end">
          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Durum</label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | FindingStatus)
              }
              className="border rounded px-2 py-1"
            >
              <option value="all">Tümü</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Month/Year */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Ay/Yıl</label>
            <input
              type="month"
              value={monthYearFilter}
              onChange={(e) => setMonthYearFilter(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Lokasyon</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "all" ? "Tümü" : loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TabsContent value="gorev" className="mt-6">
          <FindingList items={filteredFindings} />
        </TabsContent>
        <TabsContent value="denetim" className="mt-6">
          <FindingList items={filteredFindings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3) FindingList
// -----------------------------------------------------------------------------

function FindingList({ items }: { items: any[] }) {
  if (!items.length) {
    return (
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Hiç bulgu bulunamadı.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {items.map((f) => (
        <FindingCard key={f.id} finding={f} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4) FindingCard
// -----------------------------------------------------------------------------

function FindingCard({ finding }: { finding: any }) {
  // Combine "before" photos + "after" photos into one array
  // and color them differently. We'll create { url, type } objects:
  const allImages = [
    ...(finding.photos || []).map((url: string) => ({
      url,
      type: "before",
    })),
    ...(finding.afterPhotos || []).map((url: string) => ({
      url,
      type: "after",
    })),
  ];

  const [photoIndex, setPhotoIndex] = useState(0);
  const totalPhotos = allImages.length;
  const currentPhotoObj = totalPhotos > 0 ? allImages[photoIndex] : null;

  const handlePrev = () => {
    setPhotoIndex((p) => (p === 0 ? totalPhotos - 1 : p - 1));
  };
  const handleNext = () => {
    setPhotoIndex((p) => (p + 1) % totalPhotos);
  };

  // Expand image
  const [expandOpen, setExpandOpen] = useState(false);

  // For date formatting
  const createDate = isoToDateOnly(finding.createdAt);
  const completedDate = isoToDateOnly(finding.completedAt);

  // Style for status
  const statusInfo = getStatusDisplay(finding.status);

  return (
    <Card className="shadow-lg w-full">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">
            {finding.type} Bulgusu
          </CardTitle>
          <SettingsMenu finding={finding} />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          {/* Slideshow with color-coded border */}
          {currentPhotoObj ? (
            <div className="relative w-full max-h-[500px] overflow-hidden flex items-center justify-center">
              {/* Decide border color based on "before" vs "after" */}
              <img
                src={currentPhotoObj.url}
                alt="Finding"
                className={`object-contain max-h-[500px] border-4 rounded-md ${
                  currentPhotoObj.type === "before"
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
              {/* Arrows if multiple */}
              {totalPhotos > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-1 rounded"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-1 rounded"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Expand icon */}
              <button
                onClick={() => setExpandOpen(true)}
                className="absolute bottom-2 right-2 text-white bg-black/50 p-1 rounded"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full h-64 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded-md">
              No Image
            </div>
          )}

          {/* Status */}
          <div className="flex items-center">
            <strong>Durum:</strong>
            <span
              className={`ml-2 inline-flex items-center ${statusInfo.colorClass}`}
            >
              {statusInfo.icon}
              {finding.status}
            </span>
          </div>

          {/* Sorumlu Person */}
          {finding.responsiblePerson && (
            <p>
              <strong>Sorumlu:</strong> {finding.responsiblePerson}
            </p>
          )}

          {/* Bulan Kişi */}
          {finding.foundBy && (
            <p>
              <strong>Bulan Kişi:</strong> {finding.foundBy}
            </p>
          )}

          {finding.location && (
            <p>
              <strong>İlgili Yer:</strong> {finding.location}
            </p>
          )}

          <p>
            <strong>Oluşturma Tarihi:</strong> {createDate}
          </p>

          {finding.completionDeadline && (
            <p>
              <strong>Tamamlanması Gereken Tarih:</strong>{" "}
              {finding.completionDeadline}
            </p>
          )}
          {finding.completedAt && (
            <p>
              <strong>Tamamlanma Tarihi:</strong> {completedDate}
            </p>
          )}

          <Separator className="my-2" />
          <p>
            <strong>Bulgu Açıklaması:</strong> {finding.comment}
          </p>

          {/* Additional action reports */}
          {finding.actionReports && finding.actionReports.length > 0 && (
            <div className="mt-2 space-y-1">
              <strong>Raporlar:</strong>
              {finding.actionReports.map((rep: any, i: number) => (
                <div key={i} className="ml-4 text-sm text-muted-foreground">
                  <p>
                    <em>{isoToDateOnly(rep.date)}</em> - {rep.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Expand Image Dialog */}
      {currentPhotoObj && (
        <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
          <DialogContent className="w-full sm:max-w-5xl h-auto">
            <DialogHeader>
              <DialogTitle>Resim</DialogTitle>
            </DialogHeader>
            <div className="relative w-full flex items-center justify-center bg-muted rounded-md">
              <img
                src={currentPhotoObj.url}
                alt="Expanded"
                className={`object-contain max-h-[70vh] border-4 rounded-md m-4 ${
                  currentPhotoObj.type === "before"
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setExpandOpen(false)}>Kapat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

// -----------------------------------------------------------------------------
// 5) SettingsMenu
// -----------------------------------------------------------------------------

function SettingsMenu({ finding }: { finding: any }) {
  const [open, setOpen] = useState(false);
  const { createGorevFromBulgu } = useChecklistStore();
  const { deleteFinding, updateFinding } = useFindingStore.getState();
  const { toast } = useToast();

  const isCompleted = finding.status === "Tamamlandı";
  const extensionButtonLabel = finding.completionDeadline
    ? "Ek Süre Talebi"
    : "Bitiş Tarihi Belirle";

  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [title, setTitle] = useState("Tamirat Görevi");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [assignedUser, setAssignedUser] = useState("Ali");
  const [itemsText, setItemsText] = useState("");

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [showResponsibleDialog, setShowResponsibleDialog] = useState(false);
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" side="left">
          <div className="flex flex-col space-y-1">
            {!isCompleted && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-1"
                  onClick={() => {
                    setOpen(false);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Düzenle
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-1"
                  onClick={() => {
                    setOpen(false);
                    setShowActionDialog(true);
                  }}
                >
                  <PlusCircle className="w-4 h-4" />
                  Aksiyon Ekle
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-1"
                  onClick={() => {
                    setOpen(false);
                    setShowResponsibleDialog(true);
                  }}
                >
                  <Users className="w-4 h-4" />
                  Sorumlu Ekle/Değiştir
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-1"
                  onClick={() => {
                    setOpen(false);
                    setShowExtensionDialog(true);
                  }}
                >
                  <Clock className="w-4 h-4" />
                  {extensionButtonLabel}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-1"
                  onClick={() => {
                    setOpen(false);
                    setShowCreateTaskDialog(true);
                  }}
                >
                  <Aperture className="w-4 h-4" />
                  Görev Oluştur
                </Button>
              </>
            )}

            {/* Bulgu Rapor always visible */}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start gap-1"
              onClick={() => {
                setOpen(false);
                setShowReportDialog(true);
              }}
            >
              <Copy className="w-4 h-4" />
              Bulgu Rapor
            </Button>

            {/* Delete always visible */}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start gap-1 text-red-500"
              onClick={() => {
                setOpen(false);
                setShowDeleteDialog(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
              Sil
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulgu Sil</DialogTitle>
          </DialogHeader>
          <p>Bu bulguyu silmek istediğinize emin misiniz?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Vazgeç
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteFinding(finding.id);
                toast({
                  title: "Bulgu Silindi",
                  description: "Bulgu başarıyla silindi.",
                  variant: "destructive",
                });
                setShowDeleteDialog(false);
              }}
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Görev Oluştur */}
      <Dialog
        open={showCreateTaskDialog}
        onOpenChange={setShowCreateTaskDialog}
      >
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulgu için Görev Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Bu bulguyu çözmek üzere bir görev atayabilirsiniz.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Görev Başlığı</label>
              <input
                className="border p-1 rounded text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="text-sm font-medium">Sorumlu Kişi</label>
              <select
                className="border p-1 rounded text-sm"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
              >
                <option value="Ali">Ali</option>
                <option value="Ayşe">Ayşe</option>
                <option value="Mehmet">Mehmet</option>
              </select>

              <label className="text-sm font-medium">Maddeler</label>
              <textarea
                rows={3}
                className="border p-1 rounded text-sm"
                placeholder="Her satıra bir madde..."
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
              />

              <label className="text-sm font-medium">Due Date</label>
              <input
                type="date"
                className="border p-1 rounded text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <label className="text-sm font-medium">Due Time</label>
              <input
                type="time"
                className="border p-1 rounded text-sm"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateTaskDialog(false)}
            >
              Vazgeç
            </Button>
            <Button
              onClick={() => {
                const location = finding.location || "Lobi";
                useChecklistStore
                  .getState()
                  .createGorevFromBulgu(
                    finding.id,
                    title,
                    location,
                    dueDate,
                    dueTime,
                    assignedUser
                  );

                // Optionally add items
                const lines = itemsText
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean);

                const checklistId = useChecklistStore
                  .getState()
                  .checklists.find((c) => c.bulguId === finding.id)?.id;
                if (checklistId) {
                  lines.forEach((label) => {
                    useChecklistStore.getState().addItem(checklistId, label);
                  });
                }
                setShowCreateTaskDialog(false);
              }}
            >
              Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Düzenle Dialog */}
      <EditDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        finding={finding}
      />

      {/* Aksiyon Ekle Dialog */}
      <ActionDialog
        open={showActionDialog}
        onClose={() => setShowActionDialog(false)}
        finding={finding}
      />

      {/* Sorumlu Ekle/Değiştir */}
      <ResponsibleDialog
        open={showResponsibleDialog}
        onClose={() => setShowResponsibleDialog(false)}
        finding={finding}
      />

      {/* Ek Süre Talebi */}
      <ExtensionDialog
        open={showExtensionDialog}
        onClose={() => setShowExtensionDialog(false)}
        finding={finding}
      />

      {/* Bulgu Rapor */}
      <ReportDialog
        open={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        finding={finding}
      />
    </>
  );
}

// -----------------------------------------------------------------------------
// 6) EditDialog, ActionDialog, etc. (unchanged except for responsiveness)
// -----------------------------------------------------------------------------

function EditDialog({
  open,
  onClose,
  finding,
}: {
  open: boolean;
  onClose: () => void;
  finding: any;
}) {
  const { updateFinding } = useFindingStore.getState();
  const [status, setStatus] = useState(finding?.status);
  const [comment, setComment] = useState(finding?.comment || "");

  if (!finding) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulgu Düzenle</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Durum</label>
            <select
              className="border p-1 rounded text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value as FindingStatus)}
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Açıklama</label>
            <textarea
              rows={4}
              className="border p-1 rounded text-sm w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button
            onClick={() => {
              updateFinding(finding.id, { status, comment });
              onClose();
            }}
          >
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ActionDialog({
  open,
  onClose,
  finding,
}: {
  open: boolean;
  onClose: () => void;
  finding: any;
}) {
  const { updateFinding } = useFindingStore.getState();
  const [actionNote, setActionNote] = useState("");
  const [afterImages, setAfterImages] = useState<string[]>([]);

  if (!finding) return null;

  // Upload new "after" images
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result;
        if (typeof base64 === "string") {
          setAfterImages((prev) => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    // Merge with existing afterPhotos
    const newAfter = [...(finding.afterPhotos || []), ...afterImages];

    // Also store an optional "actionReports"
    const newReport = {
      date: new Date().toISOString(),
      text: actionNote,
    };
    const updatedReports = [...(finding.actionReports || []), newReport];

    // Mark bulgu "Tamamlandı"
    updateFinding(finding.id, {
      afterPhotos: newAfter,
      actionReports: updatedReports,
      status: "Tamamlandı",
      completedAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Aksiyon Ekle</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="text-sm font-medium">Aksiyon Notu</label>
          <textarea
            rows={2}
            className="border p-1 rounded text-sm w-full"
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
          />
          <label className="text-sm font-medium">After Fotoğrafları</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button onClick={handleSubmit}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ResponsibleDialog({
  open,
  onClose,
  finding,
}: {
  open: boolean;
  onClose: () => void;
  finding: any;
}) {
  const { updateFinding } = useFindingStore.getState();
  const [responsible, setResponsible] = useState("Ali");

  if (!finding) return null;

  const handleSubmit = () => {
    updateFinding(finding.id, {
      responsiblePerson: responsible,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sorumlu Ekle/Değiştir</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <select
            className="border p-1 rounded text-sm"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          >
            <option value="Ali">Ali</option>
            <option value="Ayşe">Ayşe</option>
            <option value="Mehmet">Mehmet</option>
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button onClick={handleSubmit}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ExtensionDialog({
  open,
  onClose,
  finding,
}: {
  open: boolean;
  onClose: () => void;
  finding: any;
}) {
  const { updateFinding } = useFindingStore.getState();
  const dialogTitle = finding.completionDeadline
    ? "Ek Süre Talebi"
    : "Bitiş Tarihi Belirle";

  const [deadline, setDeadline] = useState("");

  if (!finding) return null;

  const handleSubmit = () => {
    updateFinding(finding.id, {
      completionDeadline: deadline,
      status: "Onay bekleyen",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="date"
            className="border p-1 rounded text-sm"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button onClick={handleSubmit}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Bulgu Rapor with before/after images. */
function ReportDialog({
  open,
  onClose,
  finding,
}: {
  open: boolean;
  onClose: () => void;
  finding: any;
}) {
  if (!finding) return null;

  const beforePhotos = finding.photos || [];
  const afterPhotos = finding.afterPhotos || [];
  const actionReports = finding.actionReports || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bulgu Raporu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Bu bulgunun önceki ve sonraki fotoğrafları.
          </p>

          <p className="font-semibold text-red-600">Before:</p>
          <div className="flex flex-wrap gap-4 mb-4">
            {beforePhotos.map((p: string, i: number) => (
              <img
                key={i}
                src={p}
                alt={`Before ${i}`}
                className="max-h-[300px] object-contain border-2 border-red-500 rounded"
              />
            ))}
          </div>

          <p className="font-semibold text-green-600">After:</p>
          <div className="flex flex-wrap gap-4 mb-4">
            {afterPhotos.map((p: string, i: number) => (
              <img
                key={i}
                src={p}
                alt={`After ${i}`}
                className="max-h-[300px] object-contain border-2 border-green-500 rounded"
              />
            ))}
          </div>

          {actionReports.length > 0 && (
            <div className="mt-4 space-y-2">
              <strong>Eklenen Raporlar:</strong>
              {actionReports.map((r: any, idx: number) => (
                <div key={idx} className="pl-4 text-sm text-muted-foreground">
                  <em>{isoToDateOnly(r.date)}</em> – {r.text}
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Kapat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
