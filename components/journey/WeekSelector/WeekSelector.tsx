'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import styles from './WeekSelector.module.css';
import { getWeeksCurrent, getWeeksDemo } from '@/lib/api/clientApi';
import { useWeekStore } from '@/lib/store/weekStore';

function is401(err: unknown) {
  const e = err as AxiosError | undefined;
  return !!e && typeof e === 'object' && (e as any)?.response?.status === 401;
}

const TOTAL_WEEKS = 42;

export default function WeekSelector() {
  const router = useRouter();
  const { weekNumber } = useParams<{ weekNumber?: string }>();

  const weekFromStore = useWeekStore((s) => s.weekNumb);
  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const activeWeek = useMemo(() => {
    const n = Number(weekNumber);
    if (!Number.isFinite(n) || n < 1) return weekFromStore || 1;
    return n;
  }, [weekNumber, weekFromStore]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', 'current-or-demo'],
    queryFn: async () => {
      try {
        return await getWeeksCurrent();
      } catch (err) {
        if (is401(err)) return await getWeeksDemo();
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setCurWeek(activeWeek);
  }, [activeWeek, setCurWeek]);

  const goToWeek = useCallback(
    (week: number) => {
      router.push(`/journey/${week}`, { scroll: false });
    },
    [router]
  );

  if (isLoading) return <div>Loading weeks...</div>;
  if (isError || !data) return null;
  const apiWeekNumber = Number(data.data?.weekNumber);
  const currentWeek =
    Number.isFinite(apiWeekNumber) && apiWeekNumber >= 1 ? apiWeekNumber : 1;

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {weeks.map((week) => {
        const isActive = week === activeWeek;
        const isCurrent = week === currentWeek;
        const isPast = week < currentWeek;
        const isDisabled = week > currentWeek;

        const className = [
          styles.week,
          isPast && styles.past,
          isCurrent && styles.current,
          isActive && styles.active,
          isDisabled && styles.disabled,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={week}
            type="button"
            disabled={isDisabled}
            onClick={() => goToWeek(week)}
            className={className}
            aria-current={isActive ? 'page' : undefined}
            title={
              isDisabled
                ? 'Недоступно: тижні після поточного заблоковані'
                : undefined
            }
          >
            <span className={styles.weekNumber}>{week}</span>
            <span className={styles.weekLabel}>Тиждень</span>
          </button>
        );
      })}
    </div>
  );
}
