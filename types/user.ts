export type childGender = 'Ще не знаю' | 'Дівчинка' | 'Хлопчик';

export interface User {
  _id: string;
  name: string;
  email: string;
  childGender?: childGender;
  dueDate?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}
