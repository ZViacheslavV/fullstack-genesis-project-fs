// 'use client';

// import { useMemo } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

// import styles from './WeekSelector.module.css';
// import { getCurrentWeekInfo } from '@/lib/api/clientApi';

// type Tab = 'baby' | 'momy';

// export default function WeekSelector() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const parts = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

//   const activeWeek = useMemo(() => {
//     const weekStr = parts[1];
//     const n = Number(weekStr);
//     return Number.isFinite(n) && n >= 1 ? n : 1;
//   }, [parts]);

//   const activeTab: Tab = useMemo(() => {
//     const tab = parts[2];
//     return tab === 'momy' ? 'momy' : 'baby';
//   }, [parts]);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['weeks', 'current'],
//     queryFn: getCurrentWeekInfo,
//   });

//   if (isLoading) return <div>Loading weeks...</div>;
//   if (isError || !data) return null;

//   const currentWeek = data.weekNumber;
//   const totalWeeks = 42;
//   const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

//   return (
//     <div className={styles.wrapper}>
//       {weeks.map((week) => {
//         const isDisabled = week > currentWeek;
//         const isActive = week === activeWeek;

//         return (
//           <button
//             key={week}
//             type="button"
//             disabled={isDisabled}
//             onClick={() => router.push(`/journey/${week}/${activeTab}`)}
//             className={`${styles.week} ${isActive ? styles.active : ''}`}
//           >
//             {week}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import styles from './WeekSelector.module.css';
import { getCurrentWeekInfo, getDemoWeeksInfo } from '@/lib/api/clientApi';
import { useWeekStore } from '@/lib/store/weekStore';

type Tab = 'baby' | 'mom';

function is401(err: unknown) {
  const e = err as AxiosError | undefined;
  return !!e && typeof e === 'object' && (e as any)?.response?.status === 401;
}

export default function WeekSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const { activeWeek, activeTab } = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);

    const journeyIdx = parts.indexOf('journey');
    const weekStr = journeyIdx >= 0 ? parts[journeyIdx + 1] : undefined;
    const tabStr = journeyIdx >= 0 ? parts[journeyIdx + 2] : undefined;

    const week = Number(weekStr);
    const safeWeek = Number.isFinite(week) && week >= 1 ? week : 1;

    let tab: Tab = 'baby';
    if (tabStr === 'mom' || tabStr === 'momy' || tabStr === 'momyJourney')
      tab = 'mom';
    if (tabStr === 'baby' || tabStr === 'babyJourney') tab = 'baby';

    return { activeWeek: safeWeek, activeTab: tab };
  }, [pathname]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', 'current-or-demo'],
    queryFn: async () => {
      try {
        return await getCurrentWeekInfo();
      } catch (err) {
        if (is401(err)) {
          return await getDemoWeeksInfo();
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    setCurWeek(activeWeek);
  }, [activeWeek, setCurWeek]);

  const replaceWeekInPath = useCallback(
    (newWeek: number) => {
      const parts = pathname.split('/').filter(Boolean);
      const journeyIdx = parts.indexOf('journey');
      if (journeyIdx === -1) {
        router.push(`/journey/${newWeek}/${activeTab}`);
        return;
      }
      parts[journeyIdx + 1] = String(newWeek);

      if (!parts[journeyIdx + 2]) parts[journeyIdx + 2] = activeTab;

      router.push('/' + parts.join('/'));
    },
    [pathname, router, activeTab]
  );

  if (isLoading) return <div>Loading weeks...</div>;
  if (isError || !data) return null;

  const currentWeek = data.weekNumber;
  const totalWeeks = 42;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {weeks.map((week) => {
        const isDisabled = week > currentWeek;
        const isActive = week === activeWeek;

        return (
          <button
            key={week}
            type="button"
            disabled={isDisabled}
            onClick={() => replaceWeekInPath(week)}
            className={`${styles.week} ${isActive ? styles.active : ''}`}
          >
            {week}
          </button>
        );
      })}
    </div>
  );
}
