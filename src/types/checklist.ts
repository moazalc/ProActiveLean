// src/types/checklist.ts

export type LocationOption =
  | "Katlar"
  | "Lobi"
  | "Restoran"
  | "Bahçe"
  | "Bolum"
  | "Havuz"
  | "Toplantı odalar"
  | "Tuvaletler";

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  comment?: string;
  photo?: string; // base64
}

export interface Checklist {
  id: string;
  title: string;
  location?: LocationOption;
  dueDate?: string; // ISO string or "YYYY-MM-DD" etc.
  assignedUserId?: string;
  items: ChecklistItem[];
  completed: boolean;
  score?: number;
}