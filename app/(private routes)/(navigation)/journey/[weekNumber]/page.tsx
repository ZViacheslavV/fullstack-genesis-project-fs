'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';

export default function JourneyPage() {
  const router = useRouter();
  const { weekNumber } = useParams<{ weekNumber?: string }>();

  const week = useMemo(() => {
    const n = Number(weekNumber);
    return Number.isFinite(n) && n >= 1 ? n : null;
  }, [weekNumber]);

  useEffect(() => {
    if (week === null) router.replace('/journey/1');
  }, [week, router]);

  if (week === null) return null;

  return (
    <JourneyDetails
      baby={<BabyJourney weekNumber={week} />}
      mom={<MomyJourney weekNumber={week} />}
    />
  );
}
