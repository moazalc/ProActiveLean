export interface Question {
  areas: any;
  id: string;
  sequence: number;
  text: string;
  isChecklist: boolean;
  checklistItems?: string[];
  relatedAreas: string[];
  subQuestions: Question[];
  usedInInspection: boolean;
  count: number;
  cardArea: string;
}

export interface Area {
  id: string;
  name: string;
  questions: Question[];
}

export interface User {
  isAdmin: boolean;
}
