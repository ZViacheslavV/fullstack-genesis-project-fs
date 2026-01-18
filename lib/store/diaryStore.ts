'use client';

import { create } from 'zustand';
import toast from 'react-hot-toast';

import type { DiaryEntry, EmotionObj } from '@/types/diary';

import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getEmotions,
  type DiaryPayload
} from '@/lib/api/clientApi';

type DiaryStore = {
  entries: DiaryEntry[];
  emotions: EmotionObj[];
  isLoading: boolean;

  fetchEntries: (forceRefresh?: boolean) => Promise<void>;
  fetchEmotions: () => Promise<void>;

  addEntry: (data: DiaryPayload) => Promise<void>;
  editEntry: (id: string, data: DiaryPayload) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
};

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  entries: [],
  emotions: [],
  isLoading: false,

  /* ================= GET ENTRIES ================= */
  fetchEntries: async (forceRefresh = false) => {
    if (get().entries.length > 0 && !forceRefresh) return;

    set({ isLoading: true });
    try {
      const data = await getDiaries();
      set({ entries: data, isLoading: false });
    } catch {
      toast.error('Не вдалося завантажити записи');
      set({ isLoading: false });
    }
  },

  /* ================= GET EMOTIONS ================= */
  fetchEmotions: async () => {
    if (get().emotions.length > 0) return;

    try {
      const data = await getEmotions();
      // Сортування
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
      set({ emotions: sorted });
    } catch (error) {
      console.error(error);
      toast.error('Не вдалося завантажити категорії');
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