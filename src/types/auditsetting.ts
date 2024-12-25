// src/types/audit.ts
export type AuditFrequency = "daily" | "weekly" | "monthly";

export interface AuditSetting {
  id: string;
  frequency: AuditFrequency;
  // If daily, we might store "every X days" in dailyInterval
  // If weekly, we might store "which day of the week" (0-6)
  // If monthly, we might store "which date of the month" (1-31)
  dailyInterval?: number; // e.g. every 3 days
  weeklyDay?: number; // e.g. 2 => Tuesday
  monthlyDay?: number; // e.g. 15 => 15th of the month

  // The auditor in charge
  assignedAuditorId: string;
}
