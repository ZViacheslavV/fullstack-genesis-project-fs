'use client';

import { useMemo, useCallback, useEffect } from 'react';
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

  const week = Math.min(
    TOTAL_WEEKS,
    Math.max(1, TOTAL_WEEKS - Math.floor(daysLeft / 7))
  );

  return week;
}

function clampWeek(n: number) {
  return Math.min(TOTAL_WEEKS, Math.max(1, n));
}

export default function WeekSelector() {
  const router = useRouter();
  const { weekNumber } = useParams<{ weekNumber?: string }>();

  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const user = useAuthUserStore((s) => s.user);
  const dueDate = user?.dueDate;

  // const [emblaRef, emblaApi] = useEmblaCarousel(
  //   {
  //     dragFree: true,
  //     containScroll: 'trimSnaps',
  //     align: 'start',
  //   },
  //   [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  // );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      align: 'start',
      // containScroll: 'keepSnaps', // або взагалі прибрати цю опцію
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  );

  const currentWeek = useMemo(
    () => calcCurrentWeekFromDueDate(dueDate),
    [dueDate]
  );

  const activeWeek = useMemo(() => {
    const n = Number(weekNumber);
    return Number.isFinite(n) && n >= 1 ? clampWeek(n) : 1;
  }, [weekNumber]);

  useEffect(() => {
    setCurWeek(activeWeek);
  }, [activeWeek, setCurWeek]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(activeWeek - 1, true);
  }, [emblaApi, activeWeek]);

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
              <div key={week} className={styles.slide}>
                <button
                  type="button"
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : 0}
                  onClick={() => {
                    if (isDisabled) return;
                    goToWeek(week);
                  }}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// 'use client';

// import { useMemo, useCallback, useEffect, useRef } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import useEmblaCarousel from 'embla-carousel-react';
// import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

// import styles from './WeekSelector.module.css';
// import { useWeekStore } from '@/lib/store/weekStore';
// import { useAuthUserStore } from '@/lib/store/authStore';

// const TOTAL_WEEKS = 40;
// const MS_IN_DAY = 24 * 60 * 60 * 1000;

// function calcCurrentWeekFromDueDate(dueDate?: string | null) {
//   if (!dueDate) return 1;

//   const iso = dueDate.includes('T') ? dueDate : `${dueDate}T00:00:00`;
//   const due = new Date(iso);
//   const today = new Date();

//   const daysLeft = Math.max(
//     0,
//     Math.ceil((due.getTime() - today.getTime()) / MS_IN_DAY)
//   );

//   return Math.min(
//     TOTAL_WEEKS,
//     Math.max(1, TOTAL_WEEKS - Math.floor(daysLeft / 7))
//   );
// }

// function clampWeek(n: number) {
//   return Math.min(TOTAL_WEEKS, Math.max(1, n));
// }

// export default function WeekSelector() {
//   const router = useRouter();
//   const { weekNumber } = useParams<{ weekNumber?: string }>();

//   const setCurWeek = useWeekStore((s) => s.setCurWeek);

//   const user = useAuthUserStore((s) => s.user);
//   const dueDate = user?.dueDate;

//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       align: 'start',
//       containScroll: 'trimSnaps',
//       dragFree: false, // snap по слайдах
//       skipSnaps: false,
//     },
//     [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
//   );

//   const currentWeek = useMemo(
//     () => calcCurrentWeekFromDueDate(dueDate),
//     [dueDate]
//   );

//   // Тиждень з URL, але не більше за поточний
//   const activeWeek = useMemo(() => {
//     const n = Number(weekNumber);
//     const urlWeek = Number.isFinite(n) && n >= 1 ? clampWeek(n) : 1;
//     return Math.min(urlWeek, currentWeek || 1);
//   }, [weekNumber, currentWeek]);

//   // 👇 прапорець "користувач вже взаємодіяв" (клік/скрол)
//   const hasInteractedRef = useRef(false);

//   // дзеркалимо активний тиждень в store
//   useEffect(() => {
//     setCurWeek(activeWeek);
//   }, [activeWeek, setCurWeek]);

//   // 🔹 Автопозиціонування ТІЛЬКИ при першому відкритті (на поточний тиждень)
//   useEffect(() => {
//     if (!emblaApi) return;
//     if (hasInteractedRef.current) return; // якщо вже був клік/скрол — нічого не чіпаємо

//     const target = clampWeek(currentWeek || 1);
//     emblaApi.scrollTo(target - 1, true);
//   }, [emblaApi, currentWeek]);

//   const goToWeek = useCallback(
//     (week: number) => {
//       const safe = clampWeek(week);
//       if (safe > currentWeek) return; // не дозволяємо майбутні тижні

//       hasInteractedRef.current = true; // ✅ юзер явно вибрав тиждень

//       setCurWeek(safe);
//       router.push(`/journey/${safe}`, { scroll: false });
//     },
//     [router, setCurWeek, currentWeek]
//   );

//   // Після wheel/drag: прилипаємо до найближчого дозволеного та оновлюємо URL
//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSettle = () => {
//       const index = emblaApi.selectedScrollSnap();
//       let week = index + 1;

//       const maxAllowed = clampWeek(currentWeek || 1);
//       if (week > maxAllowed) {
//         week = maxAllowed;
//         emblaApi.scrollTo(maxAllowed - 1, true);
//       }

//       // будь-який settle = вважаємо, що була взаємодія
//       hasInteractedRef.current = true;

//       if (week !== activeWeek) {
//         setCurWeek(week);
//         router.push(`/journey/${week}`, { scroll: false });
//       }
//     };

//     emblaApi.on('settle', onSettle);
//     return () => {
//       emblaApi.off('settle', onSettle);
//     };
//   }, [emblaApi, router, currentWeek, activeWeek, setCurWeek]);

//   const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

//   return (
//     <div className={styles.wrapper}>
//       <div ref={emblaRef} className={styles.viewport}>
//         <div className={styles.container}>
//           {weeks.map((week) => {
//             const isActive = week === activeWeek;
//             const isCurrent = week === currentWeek;
//             const isPast = week < currentWeek;
//             const isDisabled = week > currentWeek;

//             const className = [
//               styles.week,
//               isPast && styles.past,
//               isCurrent && styles.current,
//               isActive && styles.active,
//               isDisabled && styles.disabled,
//             ]
//               .filter(Boolean)
//               .join(' ');

//             return (
//               <div key={week} className={styles.slide}>
//                 <button
//                   type="button"
//                   aria-disabled={isDisabled}
//                   tabIndex={isDisabled ? -1 : 0}
//                   onClick={() => {
//                     if (isDisabled) return;
//                     goToWeek(week);
//                   }}
//                   className={className}
//                   aria-current={isActive ? 'page' : undefined}
//                   title={
//                     isDisabled
//                       ? 'Недоступно: тижні після поточного заблоковані'
//                       : undefined
//                   }
//                 >
//                   <span className={styles.weekNumber}>{week}</span>
//                   <span className={styles.weekLabel}>Тиждень</span>
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
