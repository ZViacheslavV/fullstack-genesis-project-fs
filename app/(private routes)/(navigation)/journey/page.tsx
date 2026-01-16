// const JourneyPage = () => {
//   return <h1>JourneyPageMainRedirect</h1>;
// };

// export default JourneyPage;
// import { redirect } from 'next/navigation';

// export default function JourneyIndexPage() {
//   redirect('/journey/1');
// }

'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthUserStore } from '@/lib/store/authStore';

const TOTAL_WEEKS = 40;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

function calcCurrentWeekFromDueDate(dueDate?: string | null): number {
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

export default function JourneyIndexPage() {
  const router = useRouter();
  const user = useAuthUserStore((s) => s.user);
  const currentWeek = useMemo(
    () => calcCurrentWeekFromDueDate(user?.dueDate),
    [user?.dueDate]
  );

  useEffect(() => {
    const target = Number.isFinite(currentWeek) ? currentWeek : 1;
    router.replace(`/journey/${target}`, { scroll: false });
  }, [router, currentWeek]);

  return null;
}
