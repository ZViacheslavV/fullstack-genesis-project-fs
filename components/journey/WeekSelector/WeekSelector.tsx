'use client';

import { useMemo, useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import styles from './WeekSelector.module.css';
import { useWeekStore } from '@/lib/store/weekStore';
import { useAuthUserStore } from '@/lib/store/authStore';

const TOTAL_WEEKS = 40;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

function calcCurrentWeekFromDueDate(dueDate?: string | null) {
  if (!dueDate) return 1;

  const iso = dueDate.includes('T') ? dueDate : `${dueDate}T00:00:00`;
  const due = new Date(iso);
  const today = new Date();

  const daysLeft = Math.max(
    0,
    Math.ceil((due.getTime() - today.getTime()) / MS_IN_DAY)
  );

  return Math.min(
    TOTAL_WEEKS,
    Math.max(1, TOTAL_WEEKS - Math.floor(daysLeft / 7))
  );
}

function clampWeek(n: number) {
  return Math.min(TOTAL_WEEKS, Math.max(1, n));
}

export default function WeekSelector() {
  const router = useRouter();
  const { weekNumber } = useParams<{ weekNumber?: string }>();

  const storeWeek = useWeekStore((s) => s.weekNumb);
  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const user = useAuthUserStore((s) => s.user);
  const dueDate = user?.dueDate ?? null;
  const userId = user?._id ?? null;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      containScroll: 'trimSnaps',
      align: 'start',
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  );

  const currentWeek = useMemo(
    () => calcCurrentWeekFromDueDate(dueDate),
    [dueDate]
  );

  const urlWeek = useMemo(() => {
    const n = Number(weekNumber);
    return Number.isFinite(n) && n >= 1 ? clampWeek(n) : 1;
  }, [weekNumber]);

  const [isFirstOpen, setIsFirstOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsFirstOpen(null);
      return;
    }

    const key = `journey-first-open-${userId}`;
    const already = sessionStorage.getItem(key);

    if (already) {
      setIsFirstOpen(false);
    } else {
      sessionStorage.setItem(key, '1');
      setIsFirstOpen(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    if (!dueDate && storeWeek !== 1) {
      setCurWeek(1);
    }
  }, [userId, dueDate, storeWeek, setCurWeek]);

  const defaultWeek = useMemo(
    () => (dueDate ? currentWeek : 1),
    [dueDate, currentWeek]
  );

  useEffect(() => {
    if (isFirstOpen !== true) return;

    if (urlWeek !== defaultWeek) {
      router.replace(`/journey/${defaultWeek}`, { scroll: false });
    }
  }, [isFirstOpen, urlWeek, defaultWeek, router]);

  const effectiveWeek = isFirstOpen === true ? defaultWeek : urlWeek;

  useEffect(() => {
    setCurWeek(effectiveWeek);
  }, [effectiveWeek, setCurWeek]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(effectiveWeek - 1, false);
  }, [emblaApi, effectiveWeek]);

  const goToWeek = useCallback(
    (week: number) => {
      const safe = clampWeek(week);
      if (safe > currentWeek) return;

      setCurWeek(safe);
      router.push(`/journey/${safe}`, { scroll: false });
    },
    [router, setCurWeek, currentWeek]
  );

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <div ref={emblaRef} className={styles.viewport}>
        <div className={styles.container}>
          {weeks.map((week) => {
            const isActive = week === effectiveWeek;
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
              <div key={week} className={styles.slide}>
                <button
                  type="button"
                  onClick={() => !isDisabled && goToWeek(week)}
                  className={className}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.weekNumber}>{week}</span>
                  <span className={styles.weekLabel}>Тиждень</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
