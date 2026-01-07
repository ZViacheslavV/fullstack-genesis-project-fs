import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

type AuthUserStore = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: (value: boolean) => void;
  clearIsAuthenticated: () => void;
};

//TODO Only alpha variant, need improvements and additions

const initialUser: User = {
  _id: '',
  name: '',
  email: '',
  childGender: 'Ще не знаю',
  dueDate: '',
  photo: '',
  createdAt: '',
  updatedAt: '',
};

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          user: initialUser,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'user-draft',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
