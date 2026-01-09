import { childGender, User } from '@/types/user';
import { API_ENDPOINTS, nextServer } from './api';
// import { type AxiosResponse } from 'axios';

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

export const updateMe = async (userData: UpdateProfile) => {
  const { data } = await nextServer.patch<User>(
    `${API_ENDPOINTS.USER_CURRENT_PATCH}`,
    userData
  );
  return data;
};

// ============================  TASKS  =============================

import { Task, TaskFormData, UpdateTaskStatus } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
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
