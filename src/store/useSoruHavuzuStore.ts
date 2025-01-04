// src/store/useSoruHavuzuStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CategoryQuestions,
  CategoryType,
  MainQuestion,
  SubQuestion,
} from "@/types/types";

interface SoruHavuzuState {
  categories: CategoryQuestions[];

  // CRUD operations
  addMainQuestion: (
    category: CategoryType,
    questionText: string,
    locations: string[]
  ) => void;
  editMainQuestion: (
    category: CategoryType,
    mainQuestionId: string,
    newText: string
  ) => void;
  deleteMainQuestion: (category: CategoryType, mainQuestionId: string) => void;

  addSubQuestion: (
    category: CategoryType,
    mainQuestionId: string,
    subQuestionText: string
  ) => void;
  editSubQuestion: (
    category: CategoryType,
    mainQuestionId: string,
    subQuestionId: string,
    newText: string
  ) => void;
  deleteSubQuestion: (
    category: CategoryType,
    mainQuestionId: string,
    subQuestionId: string
  ) => void;
}

const initialCategories: CategoryQuestions[] = [
  {
    category: "Temizlik",
    mainQuestions: [],
  },
  {
    category: "Düzen",
    mainQuestions: [],
  },
  {
    category: "Bölum Periyodik",
    mainQuestions: [],
  },
  {
    category: "Krontoller",
    mainQuestions: [],
  },
];

export const useSoruHavuzuStore = create<SoruHavuzuState>()(
  persist(
    (set) => ({
      // Initialize with all 4 categories empty
      categories: initialCategories,

      // ---------- MAIN QUESTION CRUD -----------
      addMainQuestion: (category, questionText) => {
        set((state) => {
          const newMainQ: MainQuestion = {
            id: crypto.randomUUID(),
            questionText,
            subQuestions: [],
            locations: [],
          };
          return {
            categories: state.categories.map((cat) => {
              if (cat.category === category) {
                return {
                  ...cat,
                  mainQuestions: [...cat.mainQuestions, newMainQ],
                };
              }
              return cat;
            }),
          };
        });
      },
      editMainQuestion: (category, mainQuestionId, newText) => {
        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.category === category) {
              return {
                ...cat,
                mainQuestions: cat.mainQuestions.map((mq) =>
                  mq.id === mainQuestionId
                    ? { ...mq, questionText: newText }
                    : mq
                ),
              };
            }
            return cat;
          }),
        }));
      },
      deleteMainQuestion: (category, mainQuestionId) => {
        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.category === category) {
              return {
                ...cat,
                mainQuestions: cat.mainQuestions.filter(
                  (mq) => mq.id !== mainQuestionId
                ),
              };
            }
            return cat;
          }),
        }));
      },

      // ---------- SUB QUESTION CRUD -----------
      addSubQuestion: (category, mainQuestionId, subQuestionText) => {
        set((state) => {
          const newSubQ: SubQuestion = {
            id: crypto.randomUUID(),
            questionText: subQuestionText,
          };
          return {
            categories: state.categories.map((cat) => {
              if (cat.category === category) {
                return {
                  ...cat,
                  mainQuestions: cat.mainQuestions.map((mq) =>
                    mq.id === mainQuestionId
                      ? {
                          ...mq,
                          subQuestions: mq.subQuestions
                            ? [...mq.subQuestions, newSubQ]
                            : [newSubQ],
                        }
                      : mq
                  ),
                };
              }
              return cat;
            }),
          };
        });
      },
      editSubQuestion: (category, mainQuestionId, subQuestionId, newText) => {
        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.category === category) {
              return {
                ...cat,
                mainQuestions: cat.mainQuestions.map((mq) => {
                  if (mq.id === mainQuestionId && mq.subQuestions) {
                    return {
                      ...mq,
                      subQuestions: mq.subQuestions.map((sq) =>
                        sq.id === subQuestionId
                          ? { ...sq, questionText: newText }
                          : sq
                      ),
                    };
                  }
                  return mq;
                }),
              };
            }
            return cat;
          }),
        }));
      },
      deleteSubQuestion: (category, mainQuestionId, subQuestionId) => {
        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.category === category) {
              return {
                ...cat,
                mainQuestions: cat.mainQuestions.map((mq) => {
                  if (mq.id === mainQuestionId && mq.subQuestions) {
                    return {
                      ...mq,
                      subQuestions: mq.subQuestions.filter(
                        (sq) => sq.id !== subQuestionId
                      ),
                    };
                  }
                  return mq;
                }),
              };
            }
            return cat;
          }),
        }));
      },
    }),
    {
      name: "soru-havuzu-storage", // unique name in localStorage
    }
  )
);
