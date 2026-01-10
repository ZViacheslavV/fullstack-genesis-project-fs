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
  gender: 'unknown',
  dueDate: '',
  photo: '',
  createdAt: '',
  updatedAt: '',
};

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      isAuthenticated: false, //TODO auth: return after auth provided
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user: User) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          user: initialUser,
          isAuthenticated: false, //TODO auth: return after auth provided
        })),
    }),
    {
      name: 'user-state',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
