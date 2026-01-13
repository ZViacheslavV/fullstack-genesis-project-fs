import { create } from 'zustand';

type WeekStore = {
  weekNumb: number;
  setCurWeek: (week: number) => void;
};

export const useWeekStore = create<WeekStore>()((set) => ({
  weekNumb: 1,
  setCurWeek: (week) => set(() => ({ weekNumb: week })),
}));
