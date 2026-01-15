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
      set({ entries: data });
    } catch {
      toast.error('Не вдалося завантажити записи');
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= CREATE ================= */
  addEntry: async (data) => {
    set({ isLoading: true });
    try {
      const created = await createDiary(data);
      set((state) => ({
        entries: [created, ...state.entries],
      }));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= UPDATE ================= */
  editEntry: async (id, data) => {
    set({ isLoading: true });
    try {
      const updated = await updateDiary(id, data);
      set((state) => ({
        entries: state.entries.map((e) => (e._id === id ? updated : e)),
      }));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  /* ================= DELETE ================= */
  removeEntry: async (id) => {
    set({ isLoading: true });
    try {
      await deleteDiary(id);
      set((state) => ({
        entries: state.entries.filter((e) => e._id !== id),
      }));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));