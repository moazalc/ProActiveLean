// src/types/audits.ts

export interface SubAuditQuestion {
  id: string;
  text: string;
  /** Could be "YES", "NO", "NA", or undefined if not answered yet. */
  answer?: "YES" | "NO" | "NA";
}

export interface AuditQuestion {
  id: string;
  text: string;
  category: string; // e.g. "Temizlik"
  itemLabel: string; // e.g. "Oda #1"
  /** Could be "YES", "NO", "NA", or undefined if not answered yet. */
  answer?: "YES" | "NO" | "NA";

  comment?: string;
  photos?: string[];

  subQuestions?: SubAuditQuestion[];
}

export interface Audit {
  id: string;
  checklistId: string;
  assignedAuditorId: string;
  location: string;
  dueDate: string;
  questions: AuditQuestion[];

  completed: boolean;
  score?: number;

  /** Name of the creator of audit */
  createdBy: string;
}
