'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import styles from './WeekSelector.module.css';
import { getCurrentWeekInfo, getDemoWeeksInfo } from '@/lib/api/clientApi';
import { useWeekStore } from '@/lib/store/weekStore';

function is401(err: unknown) {
  const e = err as AxiosError | undefined;
  return !!e && typeof e === 'object' && (e as any)?.response?.status === 401;
}

export default function WeekSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const weekFromStore = useWeekStore((s) => s.weekNumb);
  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const activeWeek = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const journeyIdx = parts.indexOf('journey');
    const weekStr = journeyIdx >= 0 ? parts[journeyIdx + 1] : undefined;

    const n = Number(weekStr);

    if (!Number.isFinite(n) || n < 1) return weekFromStore || 1;
    return n;
  }, [pathname, weekFromStore]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', 'current-or-demo'],
    queryFn: async () => {
      try {
        return await getCurrentWeekInfo();
      } catch (err) {
        if (is401(err)) return await getDemoWeeksInfo();
        throw err;
      }
    },
  });

  useEffect(() => {
    setCurWeek(activeWeek);
  }, [activeWeek, setCurWeek]);

  const goToWeek = useCallback(
    (newWeek: number) => {
      setCurWeek(newWeek);
      router.push(`/journey/${newWeek}`);
    },
    [router, setCurWeek]
  );

  if (isLoading) return <div>Loading weeks...</div>;
  if (isError || !data) return null;

  const apiWeekNumber = Number(data.weekNumber);

  const safeCurrentWeek =
    Number.isFinite(apiWeekNumber) && apiWeekNumber > 1 ? apiWeekNumber : 42;

  const totalWeeks = 42;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {weeks.map((week) => {
        const isDisabled = week > safeCurrentWeek;
        const isActive = week === activeWeek;

        return (
          <button
            key={week}
            type="button"
            disabled={isDisabled}
            onClick={() => goToWeek(week)}
            className={`${styles.week} ${isActive ? styles.active : ''}`}
          >
            {week}
          </button>
        );
      })}
    </div>
  );
}
