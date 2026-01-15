import { childGender, User } from '@/types/user';
import { API_ENDPOINTS, nextServer } from './api';
// import { type AxiosResponse } from 'axios';

import type { DiaryEntry } from '@/types/diary';

import type {
  WeeksApiResponse,
  BabyWeeksApiResponse,
  MomWeeksApiResponse,
  BabyState,
  MomState,
} from '@/types/weeks';

// import { Baby, JourneyType, Momy } from '@/types/journey';

//-----------------JOURNEY------------------------------------------------------
// type JourneyResponse<T extends JourneyType> = T extends 'baby' ? Baby : Momy;

// export async function getJourneyData<T extends JourneyType>(
//   weekNumber: number,
//   type: T
// ): Promise<JourneyResponse<T>> {
//   const { data } = await nextServer.get<JourneyResponse<T>>(
//     `/weeks/${type}/${weekNumber}`
//   );

//   return data;
// }
// ============================  SESSION  =============================
interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>(
    `${API_ENDPOINTS.REFRESH}`
  );
  return data.success;
};

// ============================  AUTH  =============================

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dueDate: string | null;
    photo: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

/*
export interface RegisterLoginUserResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dueDate: string | null;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
}

*/

export async function registerUser(
  params: RegisterRequest
): Promise<AuthResponse> {
  const { data } = await nextServer.post<AuthResponse>(
    API_ENDPOINTS.REGISTER,
    params
  );
  return data;
}

/*
export async function registerUser(
  params: RegisterRequest
): Promise<RegisterLoginUserResponse> {
  const { data } = await nextServer.post<RegisterLoginUserResponse>(
    `${API_ENDPOINTS.REGISTER}`,
    params
  );
  return data;
}
*/
export interface loginRequest {
  email: string;
  password: string;
}

export async function loginUser(params: loginRequest): Promise<AuthResponse> {
  const { data } = await nextServer.post<AuthResponse>(
    API_ENDPOINTS.LOGIN,
    params
  );
  return data;
}

/*
export async function loginUser(
  params: loginRequest
): Promise<RegisterLoginUserResponse> {
  const { data } = await nextServer.post<RegisterLoginUserResponse>(
    `${API_ENDPOINTS.LOGIN}`,
    params
  );
  return data;
}

*/

export const logout = async (): Promise<void> => {
  await nextServer.post(`${API_ENDPOINTS.LOGOUT}`);
};

// ============================  WEEKS  =============================
export type WeeksInfo = {
  weekNumber: number;
  daysLeftToBirth: number;
  babyState: BabyState;
  momState: MomState;
};

export const getWeeksDemo = async (): Promise<WeeksApiResponse> => {
  console.log('🔵 CLIENT fetch weeks DEMO'); // TODO del console.log
  const { data } = await nextServer.get<WeeksApiResponse>(
    API_ENDPOINTS.WEEKS_DEMO
  );
  return data;
};

export const getWeeksCurrent = async (): Promise<WeeksApiResponse> => {
  console.log('🔵 CLIENT fetch weeks'); // TODO del console.log
  const { data } = await nextServer.get<WeeksApiResponse>(
    API_ENDPOINTS.WEEKS_GET
  );
  return data;
};

export const getBabyWeeks = async (
  weekNumber: number | string
): Promise<BabyWeeksApiResponse> => {
  console.log('🔵 CLIENT fetch weeks BABY'); // TODO del console.log
  const { data } = await nextServer.get<BabyWeeksApiResponse>(
    `${API_ENDPOINTS.WEEKS_BABY_WEEK_NUMB}${weekNumber}`
  );
  return data;
};

export const getMomWeeks = async (
  weekNumber: number | string
): Promise<MomWeeksApiResponse> => {
  console.log('🔵 CLIENT fetch weeks MOM'); // TODO del console.log
  const { data } = await nextServer.get<MomWeeksApiResponse>(
    `${API_ENDPOINTS.WEEKS_MOM_WEEK_NUMB}${weekNumber}`
  );
  return data;
};

// ============================  USERS  =============================

export const getMe = async () => {
  const { data } = await nextServer.get<User>(
    `${API_ENDPOINTS.USER_CURRENT_GET}`
  );
  return data;
};

export interface UpdateProfile {
  name?: string;
  email?: string;
  gender?: childGender;
  dueDate?: string;
  photo?: string;
}

//TODO updateMe requires checking, alpha version
export const updateMe = async (userData: UpdateProfile) => {
  const { data } = await nextServer.patch<User>(
    `${API_ENDPOINTS.USER_CURRENT_PATCH}`,
    userData
  );
  return data;
};

//TODO test route works very strange ;-;

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  console.log(formData);
  const { data } = await nextServer.patch<User>(
    `${API_ENDPOINTS.USER_CURRENT_PATCH_AVA}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return data;
};

// ============================  TASKS  =============================

import { Task, TaskFormData, UpdateTaskStatus } from '@/types/task';
// import axios, { AxiosInstance } from 'axios';

export async function getTasks(): Promise<Task[]> {
  console.log('🔵 CLIENT fetch tasks'); // TODO del console.log
  const { data } = await nextServer.get<Task[]>(`${API_ENDPOINTS.TASKS_GET}`);
  return data;
}

export async function createTask(newTask: TaskFormData): Promise<Task> {
  const { data } = await nextServer.post<Task>(
    `${API_ENDPOINTS.TASKS_POST}`,
    newTask
  );
  return data;
}
export async function updateTaskStatus({
  id,
  isDone,
}: UpdateTaskStatus): Promise<Task> {
  const { data } = await nextServer.patch<Task>(
    `${API_ENDPOINTS.TASKS_PATCH_TASK_ID}${id}`,
    { isDone }
  );
  return data;
}

// ------------------------- Данило

export const updateCurrentUser = async (data: UpdateProfile) => {
  const res = await nextServer.patch(
    `${API_ENDPOINTS.USER_CURRENT_PATCH}`,
    data
  );
  return res.data;
};

// ------------------------- Данило

// ============================  DIARY  =============================

export type DiaryPayload = {
  title: string;
  note: string;
  emotions: string[];
};

/* ================= GET ================= */
export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const { data } = await nextServer.get<DiaryEntry[]>(
    API_ENDPOINTS.DIARIES_GET
  );
  return data;
};

/* ================= CREATE ================= */
export const createDiary = async (
  payload: DiaryPayload
): Promise<DiaryEntry> => {
  const { data } = await nextServer.post<DiaryEntry>(
    API_ENDPOINTS.DIARIES_POST,
    {
      title: payload.title,
      description: payload.note,
      emotions: payload.emotions,
    }
  );
  return data;
};

/* ================= UPDATE ================= */
export const updateDiary = async (
  id: string,
  payload: DiaryPayload
): Promise<DiaryEntry> => {
  const { data } = await nextServer.patch<DiaryEntry>(
    `${API_ENDPOINTS.DIARIES_PATCH_ID}${id}`,
    {
      title: payload.title,
      description: payload.note,
      emotions: payload.emotions,
    }
  );
  return data;
};

/* ================= DELETE ================= */
export const deleteDiary = async (id: string): Promise<void> => {
  await nextServer.delete(
    `${API_ENDPOINTS.DIARIES_DELETE_ID}${id}`,
    { responseType: 'text' } // щоб уникнути помилки парсингу порожнього JSON
  );
};
