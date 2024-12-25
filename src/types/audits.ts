// src/types/audits.ts

export interface SubAuditQuestion {
  id: string;
  text: string;
  answered?: boolean;
}

export interface AuditQuestion {
  id: string;
  text: string;
  category: string; // e.g. "Temizlik"
  itemLabel: string; // e.g. "Oda #1"
  answered: boolean;
  comment?: string;
  photo?: string;

  // Sub-questions
  subQuestions?: SubAuditQuestion[];
}

export interface Audit {
  id: string;
  checklistId: string;
  assignedAuditorId: string;
  location: string; // new field
  dueDate: string; // new field, "YYYY-MM-DD" or ISO string
  questions: AuditQuestion[];

  completed: boolean;
  score?: number;
}
