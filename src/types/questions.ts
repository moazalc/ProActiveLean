export interface Question {
  id: string;
  sequence: number;
  text: string;
  isChecklist: boolean;
  checklistItems?: string[];
  relatedAreas: string[];
  subQuestions: Question[];
  usedInInspection: boolean;
  count: number;
}

export interface Area {
  id: string;
  name: string;
  questions: Question[];
}

export interface User {
  isAdmin: boolean;
}
