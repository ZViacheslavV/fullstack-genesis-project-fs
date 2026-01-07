import { Task, TaskFormData } from '@/types/task';
import { nextServer } from './api';

export async function getTasks(): Promise<Task[]> {
  const { data } = await nextServer.get<Task[]>('/tasks');
  return data;
}

export async function createTask(newTask: TaskFormData): Promise<Task> {
  const { data } = await nextServer.post<Task>('/tasks', newTask);
  return data;
}
