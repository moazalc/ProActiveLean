"use client";

import React, { useState, useMemo } from "react";
import { useChecklistStore } from "@/store/useChecklistStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  CheckCircle,
  Loader,
  CalendarX2,
  Clock,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import GorevWizard from "./GorevWizard";

/**
 * Example location options, if you want to filter by location.
 */
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

/**
 * For status filter we can have:
 * - "all" => show all
 * - "completed" => Tamamlandı
 * - "expired" => Süresi Geçmiş
 * - "notstarted" => Başlanmamış
 *
 * We'll apply these in a useMemo if you like.
 */

/** Suppose the current worker is Ayşe with ID "2". */
const currentWorkerId = "2";

export default function MyChecklistsPage() {
  const { checklists } = useChecklistStore();
  const { toast } = useToast();

  // Filter for checklists assigned to this worker
  const workerChecklists = checklists.filter(
    (cl) => cl.assignedUserId === currentWorkerId
  );

  // Additional filter states
  const [monthYearFilter, setMonthYearFilter] = useState(""); // e.g. "2025-04"
  const [statusFilter, setStatusFilter] = useState("all"); // e.g. "completed", "expired", "notstarted"
  const [locationFilter, setLocationFilter] = useState("all");

  // For the "Start" confirm dialog
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [checklistToStart, setChecklistToStart] = useState<string | null>(null);

  // For opening the Wizard
  const [openWizardFor, setOpenWizardFor] = useState<string | null>(null);

  // Helper to see if a checklist is "expired"
  const isExpired = (dueDate?: string, completed?: boolean) => {
    if (!dueDate || completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };

  // Count how many items are checked
  const getCheckedCount = (cl: any) =>
    cl.items.filter((i: any) => i.checked).length;

  // "Başlanmamış" => 0 items checked, not completed
  const isNotStarted = (cl: any) => {
    return !cl.completed && getCheckedCount(cl) === 0;
  };

  // Filter logic
  const filteredChecklists = useMemo(() => {
    let temp = [...workerChecklists];

    // Filter by location
    if (locationFilter !== "all") {
      temp = temp.filter((cl) => cl.location === locationFilter);
    }

    // Filter by monthYear => e.g. "2025-04"
    if (monthYearFilter) {
      temp = temp.filter((cl) => {
        if (!cl.dueDate) return false;
        return cl.dueDate.startsWith(monthYearFilter);
      });
    }

    // Filter by status
    if (statusFilter !== "all") {
      temp = temp.filter((cl) => {
        const completed = cl.completed;
        const expired = isExpired(cl.dueDate, cl.completed);
        const notStarted = isNotStarted(cl);
        switch (statusFilter) {
          case "completed":
            return completed;
          case "expired":
            return expired;
          case "notstarted":
            return notStarted;
          default:
            return true;
        }
      });
    }

    return temp;
  }, [workerChecklists, locationFilter, monthYearFilter, statusFilter]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Benim Görevlerim</h1>

      {/* FILTER SECTION */}
      <div className="flex flex-wrap gap-4 items-end mb-4">
        {/* Month / Year Filter */}
        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Ay / Yıl
          </label>
          <input
            type="month"
            value={monthYearFilter}
            onChange={(e) => setMonthYearFilter(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        {/* Status Filter => "all", "completed", "expired", "notstarted" */}
        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Durum
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">Tümü</option>
            <option value="completed">Tamamlandı</option>
            <option value="expired">Süresi Geçmiş</option>
            <option value="notstarted">Başlanmamış</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Lokasyon
          </label>
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

      {/* LIST of FILTERED Checklists */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChecklists.map((cl) => {
          const completed = cl.completed;
          const expired = isExpired(cl.dueDate, cl.completed);

          return (
            <Card key={cl.id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{cl.title}</span>
                  {completed ? (
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
                <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{cl.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {cl.dueDate} {cl.dueTime && `@ ${cl.dueTime}`}
                    </span>
                  </div>
                  {typeof cl.score !== "undefined" && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      <span>Puan: {cl.score}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[80px] pr-4">
                  <p className="text-sm">
                    Bu checklist {cl.items.length} maddeden oluşuyor.
                  </p>
                </ScrollArea>
              </CardContent>

              <CardFooter>
                {/* If not completed & not expired => "Göreve Başla" */}
                {!completed && !expired ? (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setChecklistToStart(cl.id);
                      setShowStartConfirm(true);
                    }}
                  >
                    Göreve Başla
                  </Button>
                ) : completed ? (
                  <span className="text-sm text-muted-foreground">
                    Görev Tamamlandı
                  </span>
                ) : (
                  <span className="text-sm text-red-500">
                    Görev Süresi Geçmiş
                  </span>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredChecklists.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-6">
          <Clock className="w-12 h-12 text-muted-foreground" />
          <p className="text-lg font-medium">Görev bulunmuyor.</p>
        </div>
      )}

      {/* Confirmation Dialog to start a task */}
      <Dialog open={showStartConfirm} onOpenChange={setShowStartConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Göreve Başla</DialogTitle>
          </DialogHeader>
          <p>Bu göreve şimdi başlamak istediğinize emin misiniz?</p>
          <DialogFooter className="justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setShowStartConfirm(false)}
            >
              Vazgeç
            </Button>
            {checklistToStart && (
              <Button
                onClick={() => {
                  setOpenWizardFor(checklistToStart);
                  setShowStartConfirm(false);
                }}
              >
                Başla
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Wizard overlay for an individual checklist */}
      {openWizardFor && (
        <GorevWizard
          checklistId={openWizardFor}
          onClose={() => setOpenWizardFor(null)}
        />
      )}

      <Toaster />
    </div>
  );
}
