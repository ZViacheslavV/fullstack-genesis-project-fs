import { cookies } from 'next/headers';
import { API_ENDPOINTS, nextServer } from './api';

import type { User } from '@/types/user';
import { Task } from '@/types/task';

//===========================================================================

const cookieHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

// ---------------- AUTH --------------------------------------------------
export const checkServerSession = async () => {
  const headers = await cookieHeaders();
  const res = await nextServer.get<User | null>(`${API_ENDPOINTS.REFRESH}`, {
    headers,
  });
  return res;
};

// ---------------- USER --------------------------------------------------
export const getServerMe = async () => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<User>(
    `${API_ENDPOINTS.USER_CURRENT_GET}`,
    {
      headers,
    }
  );
  return data;
};

// ---------------- TASKS --------------------------------------------------
export const getServerTasks = async () => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<Task[]>(`${API_ENDPOINTS.TASKS_GET}`, {
    headers,
  });
  return data;
};

// ---------------- DIARIES --------------------------------------------------
export const fetchDiaries = async () => {};
export const fetchDiaryById = async () => {};
