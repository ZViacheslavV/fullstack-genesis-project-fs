export type childGender = 'unknown' | 'girl' | 'boy';

export interface User {
  _id: string;
  name: string;
  email: string;
  gender?: childGender;
  dueDate?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}
