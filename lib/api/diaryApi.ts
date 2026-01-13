import type { DiaryEntry } from '@/types/diary';
import { nextServer } from './api';

export type DiaryPayload = {
  title: string;
  note: string;
  emotions: string[];
};

/* ================= GET ================= */
export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const { data } = await nextServer.get<DiaryEntry[]>('/diaries');
  return data;
};

/* ================= CREATE ================= */
export const createDiary = async (payload: DiaryPayload) => {
  const { data } = await nextServer.post('/diaries', {
    title: payload.title,
    description: payload.note,
    emotions: payload.emotions,
  });
  return data;
};

/* ================= UPDATE ================= */
export const updateDiary = async (
  id: string,
  payload: DiaryPayload
) => {
  const res = await fetch('/api/diaries', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      title: payload.title,
      note: payload.note,
      emotions: payload.emotions,
    }),
  });

  if (!res.ok) {
    throw new Error('Update failed');
  }

  return res.json();
};


/* ================= DELETE ================= */
export const deleteDiary = async (id: string): Promise<void> => {
  const res = await fetch('/api/diaries', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Delete failed');
  }
};
