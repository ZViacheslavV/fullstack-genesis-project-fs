// 'use client';

// import { useParams, notFound } from 'next/navigation';
// import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
// import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
// import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';
// import WeekSelector from '../WeekSelector/WeekSelector';

// export default function JourneyPageClient() {
//   const { weekNumber } = useParams<{ weekNumber: string }>();
//   const week = Number(weekNumber);
//   if (!Number.isFinite(week) || week < 1) notFound();

//   return (
//     <>
//       <WeekSelector />
//       <JourneyDetails
//         baby={<BabyJourney weekNumber={week} />}
//         mom={<MomyJourney weekNumber={week} />}
//       />
//     </>
//   );
// }

'use client';

import { useEffect, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';

import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';
import WeekSelector from '../WeekSelector/WeekSelector';
import { useWeekStore } from '@/lib/store/weekStore';

const TOTAL_WEEKS = 40;

function clampWeek(n: number) {
  return Math.min(TOTAL_WEEKS, Math.max(1, n));
}

export default function JourneyPageClient() {
  const { weekNumber } = useParams<{ weekNumber?: string }>();

  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const weekFromUrl = useMemo(() => {
    const n = Number(weekNumber);
    if (!Number.isFinite(n)) return null;
    return clampWeek(n);
  }, [weekNumber]);

  if (weekFromUrl === null) {
    notFound();
  }

  useEffect(() => {
    setCurWeek(weekFromUrl);
  }, [weekFromUrl, setCurWeek]);

  return (
    <>
      <WeekSelector />
      <JourneyDetails
        baby={<BabyJourney weekNumber={weekFromUrl} />}
        mom={<MomyJourney weekNumber={weekFromUrl} />}
      />
    </>
  );
}
