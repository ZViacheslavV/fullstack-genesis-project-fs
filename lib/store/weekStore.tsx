// import { create } from 'zustand';

// type WeekStore = {
//   weekNumb: number;
//   setCurWeek: (week: number) => void;
// };

// export const useWeekStore = create<WeekStore>()((set) => ({
//   weekNumb: 1,
//   setCurWeek: (week) => set(() => ({ weekNumb: week })),
// }));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WeekStore = {
  weekNumb: number;
  setCurWeek: (week: number) => void;
};

export const useWeekStore = create<WeekStore>()(
  persist(
    (set) => ({
      weekNumb: 1,
      setCurWeek: (week) => set({ weekNumb: week }),
    }),
    {
      name: 'week-store',
    }
  )
);
