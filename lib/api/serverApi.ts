// import { cookies } from 'next/headers';
import { nextServer } from './api';

import type { User } from '@/types/user';

//===========================================================================

const cookieHeaders = async () => {
  // const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

// ---------------- AUTH --------------------------------------------------
export const checkSession = async () => {
  const headers = await cookieHeaders();
  const res = await nextServer.get('/auth/session', { headers });
  return res;
};

// ---------------- USER --------------------------------------------------
export const getMe = async (): Promise<User> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};

// ---------------- TASKS --------------------------------------------------
export const fetchTasks = async () => {};
export const fetchTaskById = async () => {};

// ---------------- DIARIES --------------------------------------------------
export const fetchDiaries = async () => {};
export const fetchDiaryById = async () => {};
