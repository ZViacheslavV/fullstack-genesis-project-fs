import axios, { type AxiosInstance } from 'axios';

//===========================================================================

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',

  WEEKS: '/weeks',
  WEEKS_MOM_NUMB: '/weeks/mom/',
  WEEKS_BABY_NUMB: '/weeks/baby/',
  WEEKS_DEMO: '/weeks/demo',

  USER_CURRENT_GET: '/users/current',
  USER_CURRENT_PATCH: '/users/current',
  USER_CURRENT_PATCH_AVA: '/users/current/avatar',

  DIARIES_GET: '/diaries',
  DIARIES_POST: '/diaries',
  DIARIES_DELETE_ID: '/diaries/',
  DIARIES_PATCH_ID: '/diaries/',
  EMOTIONS: '/emotions',

  TASKS_GET: '/tasks',
  TASKS_POST: '/tasks',
  TASKS_PATCH_TASK_ID: '/tasks/',
};

export const nextServer: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
