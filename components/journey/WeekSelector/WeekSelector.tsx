'use client';

import { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './WeekSelector.module.css';
import { getCurrentWeekInfo } from '@/lib/api/clientApi';

type Tab = 'baby' | 'mom';

export default function WeekSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const parts = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  const activeWeek = useMemo(() => {
    const weekStr = parts[1]; // "1"
    const n = Number(weekStr);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [parts]);

  const activeTab: Tab = useMemo(() => {
    const tab = parts[2];
    return tab === 'mom' ? 'mom' : 'baby';
  }, [parts]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', 'current'],
    queryFn: getCurrentWeekInfo,
  });

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
            onClick={() => router.push(`/journey/${week}/${activeTab}`)}
            className={`${styles.week} ${isActive ? styles.active : ''}`}
          >
            {week}
          </button>
        );
      })}
    </div>
  );
}
