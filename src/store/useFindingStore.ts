"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Type for Bulgu (Finding). */
export type FindingType = "Görev" | "Denetim";
export type FindingStatus =
  | "Açık"
  | "Tarihi Geçmiş"
  | "Onay bekleyen"
  | "Tamamlandı";

export interface Finding {
  id: string;
  type: FindingType; // "Görev" or "Denetim"
  status: FindingStatus; // one of the 4 statuses
  location?: string; // from Görev/Audit location
  createdAt: string; // date/time it was submitted
  completionDeadline?: string; // if there's a required fix date
  completedAt?: string; // date/time it was actually fixed
  comment: string; // the user’s comment describing the issue
  photos: string[]; // "before" images
  afterPhotos?: string[]; // "after" images (added via Aksiyon Ekle)
  fixTaskId?: string; // reference to a fix Görev ID, if any
  responsiblePerson?: string; // store the chosen responsible person
  actionReports?: Array<{ date: string; text: string }>; // optional extra text reports
}

/** Zustand store interface. */
interface FindingState {
  findings: Finding[];

  // Basic CRUD
  addFinding: (finding: Omit<Finding, "id">) => void;
  updateFinding: (id: string, partial: Partial<Finding>) => void;
  deleteFinding: (id: string) => void;
}

export const useFindingStore = create<FindingState>()(
  persist(
    (set, get) => ({
      findings: [],

      /** Add a new finding (auto-generate id). */
      addFinding: (finding) => {
        const newItem: Finding = {
          id: crypto.randomUUID(),
          ...finding,
        };
        set((state) => ({ findings: [...state.findings, newItem] }));
      },

      /** Update partial fields of a finding. */
      updateFinding: (id, partial) => {
        set((state) => ({
          findings: state.findings.map((f) =>
            f.id === id ? { ...f, ...partial } : f
          ),
        }));
      },

      /** Remove a finding by id. */
      deleteFinding: (id) => {
        set((state) => ({
          findings: state.findings.filter((f) => f.id !== id),
        }));
      },
    }),
    {
      name: "finding-storage", // persist key
    }
  )
);
