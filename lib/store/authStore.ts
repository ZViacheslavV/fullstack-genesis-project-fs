import {create} from "zustand";

type User = {
    name: string;
};

type AuthState = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: User) => set({user}),
    clearUser: () => set({user: null}),
}));