'use client';

import { create } from 'zustand';
import toast from 'react-hot-toast';
import type { DiaryEntry } from '@/types/diary';

import {
  getDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from '@/lib/api/diaryApi';

type DiaryPayload = {
  title: string;
  note: string;
  emotions: string[];
};

type DiaryStore = {
  entries: DiaryEntry[];
  isLoading: boolean;

  fetchEntries: () => Promise<void>;
  addEntry: (data: DiaryPayload) => Promise<void>;
  editEntry: (id: string, data: DiaryPayload) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
  entries: [],
  isLoading: false,

  /* ================= GET ================= */
  fetchEntries: async () => {
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
    const created = await createDiary({
      title: data.title,
      note: data.note,
      emotions: data.emotions,
    });

    set((state) => ({
      entries: [created, ...state.entries],
    }));
  },

  /* ================= UPDATE ================= */
  editEntry: async (id, data) => {
    const updated = await updateDiary(id, {
      title: data.title,
      note: data.note,
      emotions: data.emotions,
    });

    set((state) => ({
      entries: state.entries.map((e) =>
        e._id === id ? updated : e
      ),
    }));
  },

  /* ================= DELETE ================= */
  removeEntry: async (id) => {
    await deleteDiary(id);

    set((state) => ({
      entries: state.entries.filter((e) => e._id !== id),
    }));
  },
}));
