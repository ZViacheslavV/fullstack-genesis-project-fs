'use client';

import { create } from 'zustand';
import toast from 'react-hot-toast';
import type { DiaryEntry, EmotionObj } from '@/types/diary'; // Перевір шлях до типів
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

  // Додаємо другий параметр optimisticEmotions для миттєвого відображення
  addEntry: (data: DiaryPayload, optimisticEmotions?: EmotionObj[]) => Promise<void>;
  editEntry: (id: string, data: DiaryPayload, optimisticEmotions?: EmotionObj[]) => Promise<void>;
  
  removeEntry: (id: string) => Promise<void>;
};

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  entries: [],
  emotions: [],
  isLoading: false,

  /* ================= GET ================= */
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

  fetchEmotions: async () => {
    if (get().emotions.length > 0) return;
    try {
      const data = await getEmotions();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
      set({ emotions: sorted });
    } catch (error) {
      console.error(error);
    }
  },

  /* ================= CREATE (Optimized) ================= */
  addEntry: async (data, optimisticEmotions) => {
    // Вмикаємо лоадер, якщо треба заблокувати інтерфейс
    // set({ isLoading: true }); 
    try {
      const created = await createDiary(data);

      // Підміняємо ID емоцій на об'єкти, щоб картка відрендерилась красиво
      if (optimisticEmotions) {
        created.emotions = optimisticEmotions;
      }

      set((state) => ({
        entries: [created, ...state.entries],
      }));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      // set({ isLoading: false });
    }
  },

  /* ================= UPDATE (Optimized) ================= */
  editEntry: async (id, data, optimisticEmotions) => {
    try {
      // 1. Отримуємо оновлений запис від сервера
      const updated = await updateDiary(id, data);

      // 2. Підміняємо емоції (якщо сервер повернув ID, а нам треба показати назви)
      if (optimisticEmotions) {
        updated.emotions = optimisticEmotions;
      }

      // 3. Оновлюємо масив локально: знаходимо старий запис і міняємо на новий
      set((state) => ({
        entries: state.entries.map((entry) => 
          entry._id === id ? updated : entry
        ),
      }));

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /* ================= DELETE (Optimized) ================= */
  removeEntry: async (id) => {
    set({ isLoading: true });
    try {
      await deleteDiary(id);
      
      // Видаляємо з масиву локально
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