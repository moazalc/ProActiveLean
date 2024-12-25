// src/store/useChecklistStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Checklist, ChecklistItem, LocationOption } from "@/types/checklist";

interface ChecklistState {
  checklists: Checklist[];

  // Admin actions
  createChecklist: (
    title: string,
    location: LocationOption,
    dueDate: string
  ) => void;
  updateChecklist: (
    checklistId: string,
    title: string,
    location: LocationOption,
    dueDate: string
  ) => void;
  deleteChecklist: (checklistId: string) => void;
  assignUser: (checklistId: string, userId: string) => void;

  // Admin adds items
  addItem: (checklistId: string, label: string) => void;

  // Worker actions
  toggleItem: (checklistId: string, itemId: string) => void;
  addComment: (checklistId: string, itemId: string, comment: string) => void;
  addPhoto: (checklistId: string, itemId: string, photoBase64: string) => void;
  finishChecklist: (checklistId: string) => void;
}

export const useChecklistStore = create(
  persist<ChecklistState>(
    (set, get) => ({
      checklists: [],

      /** Creates a new checklist with title, location, dueDate */
      createChecklist: (title, location, dueDate) => {
        const newChecklist: Checklist = {
          id: crypto.randomUUID(),
          title,
          location,
          dueDate,
          assignedUserId: undefined,
          items: [],
          completed: false,
        };
        set((state) => ({
          checklists: [...state.checklists, newChecklist],
        }));
      },

      /** Updates the checklist info (title, location, dueDate) */
      updateChecklist: (checklistId, title, location, dueDate) => {
        set((state) => ({
          checklists: state.checklists.map((cl) =>
            cl.id === checklistId ? { ...cl, title, location, dueDate } : cl
          ),
        }));
      },

      /** Deletes a checklist entirely */
      deleteChecklist: (checklistId) => {
        set((state) => ({
          checklists: state.checklists.filter((cl) => cl.id !== checklistId),
        }));
      },

      /** Assigns a user from a dropdown (admin) */
      assignUser: (checklistId, userId) => {
        set((state) => ({
          checklists: state.checklists.map((cl) =>
            cl.id === checklistId ? { ...cl, assignedUserId: userId } : cl
          ),
        }));
      },

      /** Adds an item to a checklist (admin) */
      addItem: (checklistId, label) => {
        set((state) => ({
          checklists: state.checklists.map((cl) => {
            if (cl.id === checklistId) {
              const newItem: ChecklistItem = {
                id: crypto.randomUUID(),
                label,
                checked: false,
              };
              return { ...cl, items: [...cl.items, newItem] };
            }
            return cl;
          }),
        }));
      },

      /** Worker toggles an item’s checkbox */
      toggleItem: (checklistId, itemId) => {
        set((state) => ({
          checklists: state.checklists.map((cl) => {
            if (cl.id === checklistId) {
              return {
                ...cl,
                items: cl.items.map((item) =>
                  item.id === itemId
                    ? { ...item, checked: !item.checked }
                    : item
                ),
              };
            }
            return cl;
          }),
        }));
      },

      /** Worker adds a comment */
      addComment: (checklistId, itemId, comment) => {
        set((state) => ({
          checklists: state.checklists.map((cl) => {
            if (cl.id === checklistId) {
              return {
                ...cl,
                items: cl.items.map((item) =>
                  item.id === itemId ? { ...item, comment } : item
                ),
              };
            }
            return cl;
          }),
        }));
      },

      /** Worker uploads a photo (base64) */
      addPhoto: (checklistId, itemId, photoBase64) => {
        set((state) => ({
          checklists: state.checklists.map((cl) => {
            if (cl.id === checklistId) {
              return {
                ...cl,
                items: cl.items.map((item) =>
                  item.id === itemId ? { ...item, photo: photoBase64 } : item
                ),
              };
            }
            return cl;
          }),
        }));
      },

      /** Worker finishes the checklist, compute score */
      finishChecklist: (checklistId) => {
        set((state) => {
          const updated = state.checklists.map((cl) => {
            if (cl.id === checklistId) {
              const totalItems = cl.items.length;
              const checkedItems = cl.items.filter((i) => i.checked).length;
              const score = checkedItems; // or totalItems - unchecked, etc.
              return { ...cl, completed: true, score };
            }
            return cl;
          });
          return { checklists: updated };
        });
      },
    }),
    {
      name: "checklist-storage",
    }
  )
);
