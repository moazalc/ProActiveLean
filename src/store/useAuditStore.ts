// src/store/useAuditStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Audit, AuditQuestion } from "@/types/audits";

interface AuditState {
  audits: Audit[];

  createAudit: (
    checklistId: string,
    auditorId: string,
    location: string,
    dueDate: string,
    dueTime: string,
    questions: AuditQuestion[]
  ) => void;

  // Updated: accept "YES"|"NO"|"NA"
  markAnswer: (
    auditId: string,
    questionId: string,
    answer: "YES" | "NO" | "NA"
  ) => void;

  markSubQuestionAnswer: (
    auditId: string,
    parentQId: string,
    subQId: string,
    answer: "YES" | "NO" | "NA"
  ) => void;

  addPhotoToQuestion: (
    auditId: string,
    questionId: string,
    photo: string
  ) => void;

  removePhotoFromQuestion: (
    auditId: string,
    questionId: string,
    photoIndex: number
  ) => void;

  addCommentToQuestion: (
    auditId: string,
    questionId: string,
    comment: string
  ) => void;

  finishAudit: (auditId: string) => void;
  deleteAudit: (auditId: string) => void;
}

export const useAuditStore = create(
  persist<AuditState>(
    (set, get) => ({
      audits: [],
      createAudit: (
        checklistId,
        auditorId,
        location,
        dueDate,
        dueTime,
        questions
      ) => {
        const newAudit: Audit = {
          id: crypto.randomUUID(),
          checklistId,
          assignedAuditorId: auditorId,
          location,
          dueDate,
          dueTime, // <--- NEW
          questions,
          completed: false,
          createdBy: "Admin", // or pull from your auth user
          createdAt: new Date().toISOString(), // <--- NEW
          score: undefined,
        };
        set((state) => ({
          audits: [...state.audits, newAudit],
        }));
      },

      // Updated to store a string answer
      markAnswer: (auditId, questionId, answer) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id !== auditId) return a;
            return {
              ...a,
              questions: a.questions.map((q) => {
                if (q.id !== questionId) return q;
                return { ...q, answer };
              }),
            };
          }),
        }));
      },

      markSubQuestionAnswer: (auditId, parentQId, subQId, answer) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id !== auditId) return a;
            return {
              ...a,
              questions: a.questions.map((q) => {
                if (q.id !== parentQId || !q.subQuestions) return q;

                return {
                  ...q,
                  subQuestions: q.subQuestions.map((sq) => {
                    if (sq.id !== subQId) return sq;
                    return { ...sq, answer };
                  }),
                };
              }),
            };
          }),
        }));
      },

      addPhotoToQuestion: (auditId, questionId, photo) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id !== auditId) return a;
            return {
              ...a,
              questions: a.questions.map((q) => {
                if (q.id !== questionId) return q;
                const photos = q.photos || [];
                return { ...q, photos: [...photos, photo] };
              }),
            };
          }),
        }));
      },

      removePhotoFromQuestion: (auditId, questionId, photoIndex) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id !== auditId) return a;
            return {
              ...a,
              questions: a.questions.map((q) => {
                if (q.id !== questionId || !q.photos) return q;
                const newPhotos = [...q.photos];
                newPhotos.splice(photoIndex, 1);
                return { ...q, photos: newPhotos };
              }),
            };
          }),
        }));
      },

      addCommentToQuestion: (auditId, questionId, comment) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id !== auditId) return a;
            return {
              ...a,
              questions: a.questions.map((q) =>
                q.id === questionId ? { ...q, comment } : q
              ),
            };
          }),
        }));
      },

      finishAudit: (auditId) => {
        set((state) => {
          const updated = state.audits.map((a) => {
            if (a.id !== auditId) return a;

            // Example scoring: Count "YES" answers for main & sub questions
            let score = 0;
            a.questions.forEach((q) => {
              if (q.answer === "YES") score++;
              if (q.subQuestions && q.subQuestions.length > 0) {
                q.subQuestions.forEach((sq) => {
                  if (sq.answer === "YES") score++;
                });
              }
            });

            return {
              ...a,
              completed: true,
              score,
            };
          });
          return { audits: updated };
        });
      },

      deleteAudit: (auditId) => {
        set((state) => ({
          audits: state.audits.filter((a) => a.id !== auditId),
        }));
      },
    }),
    {
      name: "audits-storage",
    }
  )
);
