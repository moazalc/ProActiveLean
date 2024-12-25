// src/store/useAuditStore.ts

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Audit, AuditQuestion } from '@/types/audits';

interface AuditState {
  audits: Audit[];

  createAudit: (
    checklistId: string,
    auditorId: string,
    location: string,
    dueDate: string,
    questions: AuditQuestion[]
  ) => void;

  markAnswer: (
    auditId: string,
    questionId: string,
    answered: boolean
  ) => void;

  // NEW: handle sub-question checkboxes
  markSubQuestionAnswer: (
    auditId: string,
    parentQId: string,
    subQId: string,
    answered: boolean
  ) => void;

  addPhotoToQuestion: (auditId: string, questionId: string, photo: string) => void;
  addCommentToQuestion: (auditId: string, questionId: string, comment: string) => void;
  finishAudit: (auditId: string) => void;
  deleteAudit: (auditId: string) => void;
}

export const useAuditStore = create(
  persist<AuditState>(
    (set, get) => ({
      audits: [],

      createAudit: (checklistId, auditorId, location, dueDate, questions) => {
        const newAudit: Audit = {
          id: crypto.randomUUID(),
          checklistId,
          assignedAuditorId: auditorId,
          location,
          dueDate,
          questions,
          completed: false,
        };
        set((state) => ({
          audits: [...state.audits, newAudit],
        }));
      },

      markAnswer: (auditId, questionId, answered) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id === auditId) {
              return {
                ...a,
                questions: a.questions.map((q) =>
                  q.id === questionId ? { ...q, answered } : q
                ),
              };
            }
            return a;
          }),
        }));
      },

      // MARK SUB-QUESTION ANSWER
      markSubQuestionAnswer: (auditId, parentQId, subQId, answered) => {
        set((state) => {
          const updated = state.audits.map((a) => {
            if (a.id !== auditId) return a;

            return {
              ...a,
              questions: a.questions.map((q) => {
                if (q.id !== parentQId || !q.subQuestions) return q;

                return {
                  ...q,
                  subQuestions: q.subQuestions.map((sq) =>
                    sq.id === subQId ? { ...sq, answered } : sq
                  ),
                };
              }),
            };
          });
          return { audits: updated };
        });
      },

      addPhotoToQuestion: (auditId, questionId, photo) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id === auditId) {
              return {
                ...a,
                questions: a.questions.map((q) =>
                  q.id === questionId ? { ...q, photo } : q
                ),
              };
            }
            return a;
          }),
        }));
      },

      addCommentToQuestion: (auditId, questionId, comment) => {
        set((state) => ({
          audits: state.audits.map((a) => {
            if (a.id === auditId) {
              return {
                ...a,
                questions: a.questions.map((q) =>
                  q.id === questionId ? { ...q, comment } : q
                ),
              };
            }
            return a;
          }),
        }));
      },

      finishAudit: (auditId) => {
        set((state) => {
          const updated = state.audits.map((a) => {
            if (a.id !== auditId) return a;

            // Example scoring: # main questions answered + # sub-questions answered
            let score = 0;
            a.questions.forEach((q) => {
              if (q.answered) score++;
              if (q.subQuestions && q.subQuestions.length > 0) {
                q.subQuestions.forEach((sq) => {
                  if (sq.answered) score++;
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
      name: 'audits-storage',
    }
  )
);
