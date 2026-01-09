import { nextServer } from './api';
// import { type AxiosResponse } from 'axios';

import { Task, TaskFormData, UpdateTaskStatus } from '@/types/task';

export async function getTasks(): Promise<Task[]> {
  const { data } = await nextServer.get<Task[]>('/tasks');
  return data;
}

export async function createTask(newTask: TaskFormData): Promise<Task> {
  const { data } = await nextServer.post<Task>('/tasks', newTask);
  return data;
}
export async function updateTaskStatus({
  id,
  isDone,
}: UpdateTaskStatus): Promise<Task> {
  const { data } = await nextServer.patch<Task>(`/tasks/${id}`, { isDone });
  return data;
}
