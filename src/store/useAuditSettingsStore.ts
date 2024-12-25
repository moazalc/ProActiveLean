// src/store/useAuditSettingsStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuditSetting, AuditFrequency } from "@/types/auditsetting";

interface AuditSettingsState {
  settings: AuditSetting[];
  createSetting: (
    frequency: AuditFrequency,
    assignedAuditorId: string,
    dailyInterval?: number,
    weeklyDay?: number,
    monthlyDay?: number
  ) => void;
  updateSetting: (
    id: string,
    frequency: AuditFrequency,
    assignedAuditorId: string,
    dailyInterval?: number,
    weeklyDay?: number,
    monthlyDay?: number
  ) => void;
  deleteSetting: (id: string) => void;
}

export const useAuditSettingsStore = create(
  persist<AuditSettingsState>(
    (set) => ({
      settings: [],

      createSetting: (
        frequency,
        assignedAuditorId,
        dailyInterval,
        weeklyDay,
        monthlyDay
      ) => {
        const newSetting: AuditSetting = {
          id: crypto.randomUUID(),
          frequency,
          assignedAuditorId,
          dailyInterval,
          weeklyDay,
          monthlyDay,
        };
        set((state) => ({ settings: [...state.settings, newSetting] }));
      },

      updateSetting: (
        id,
        frequency,
        assignedAuditorId,
        dailyInterval,
        weeklyDay,
        monthlyDay
      ) => {
        set((state) => ({
          settings: state.settings.map((s) =>
            s.id === id
              ? {
                  ...s,
                  frequency,
                  assignedAuditorId,
                  dailyInterval,
                  weeklyDay,
                  monthlyDay,
                }
              : s
          ),
        }));
      },

      deleteSetting: (id) => {
        set((state) => ({
          settings: state.settings.filter((s) => s.id !== id),
        }));
      },
    }),
    {
      name: "audit-settings-storage",
    }
  )
);
