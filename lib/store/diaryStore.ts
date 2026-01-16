'use client';

import { create } from 'zustand';
import toast from 'react-hot-toast';
import type { DiaryEntry } from '@/types/diary';
import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  type DiaryPayload
} from '@/lib/api/clientApi';

type DiaryStore = {
  entries: DiaryEntry[];
  isLoading: boolean;
  fetchEntries: (forceRefresh?: boolean) => Promise<void>;
  addEntry: (data: DiaryPayload) => Promise<void>;
  editEntry: (id: string, data: DiaryPayload) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
};

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  entries: [],
  isLoading: false,

  /* ================= GET ================= */
  fetchEntries: async (forceRefresh = false) => {
    if (get().entries.length > 0 && !forceRefresh) return;

    set({ isLoading: true });
    try {
      const data = await getDiaries();
      set({ entries: data, isLoading: false });
    } catch{
      toast.error('Не вдалося завантажити записи');
      set({ isLoading: false });
    }
  },

  /* ================= CREATE ================= */
  addEntry: async (data) => {
    try {
      await createDiary(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /* ================= UPDATE ================= */
  editEntry: async (id, data) => {
    try {
      await updateDiary(id, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /* ================= DELETE ================= */
  removeEntry: async (id) => {
    try {
      await deleteDiary(id);
      set((state) => ({
        entries: state.entries.filter((e) => e._id !== id),
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));