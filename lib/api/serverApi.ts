import { cookies } from 'next/headers';
import { API_ENDPOINTS, nextServer } from './api';

import type { User } from '@/types/user';
import { Task } from '@/types/task';
import { WeeksApiResponse } from '@/types/weeks';

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
  console.log('🟢 SERVER fetch tasks'); //TODO del console.log
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<Task[]>(`${API_ENDPOINTS.TASKS_GET}`, {
    headers,
  });
  return data;
};

// ---------------- DIARIES --------------------------------------------------
export const fetchDiaries = async () => {};
export const fetchDiaryById = async () => {};

// ---------------- WEEKS --------------------------------------------------

/* export const getWeeksCurrentServer = async (cookies?: HeadersInit) => {
  return fetch(`${API_URL}/weeks/current`, {
    headers: cookies,
    cache: 'no-store',
  }).then((r) => r.json());
}; */

/* export const getWeeksDemoServer = async () => {
  return fetch(`${API_URL}/weeks/demo`, {
    cache: 'force-cache',
  }).then((r) => r.json());
};
 */
export const getWeeksCurrentServer = async () => {
  console.log('🟢 SERVER fetch weeks'); //TODO del console.log
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<WeeksApiResponse>(
    API_ENDPOINTS.WEEKS_GET,
    { headers }
  );
  return data;
};

export const getWeeksDemoServer = async () => {
  console.log('🟢 SERVER fetch weeks DEMO'); //TODO del console.log
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<WeeksApiResponse>(
    API_ENDPOINTS.WEEKS_DEMO,
    { headers }
  );
  return data;
};
