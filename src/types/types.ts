export type CategoryType =
  | "Temizlik"
  | "Düzen"
  | "Bölum Periyodik"
  | "Krontoller";

export interface SubQuestion {
  id: string;
  questionText: string;
}

export interface MainQuestion {
  id: string;
  questionText: string;
  subQuestions: SubQuestion[];
}

export interface CategoryQuestions {
  category: CategoryType;
  mainQuestions: MainQuestion[];
}
