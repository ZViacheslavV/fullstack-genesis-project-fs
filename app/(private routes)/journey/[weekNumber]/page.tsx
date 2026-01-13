'use client';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';
import GreetingBlock from '@/components/diary/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';

export default function JourneyPage() {
  const { weekNumber } = useParams<{ weekNumber: string }>();

  const week = Number(weekNumber);

  if (!weekNumber || Number.isNaN(week)) {
    notFound();
  }

  return (
    <>
      <GreetingBlock />
      <WeekSelector />

      <JourneyDetails
        baby={<BabyJourney weekNumber={week} />}
        mom={<MomyJourney weekNumber={week} />}
      />
    </>
  );
}
