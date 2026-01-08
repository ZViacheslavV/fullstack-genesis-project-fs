export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface TaskFormData {
  name: string;
  date: string;
}
