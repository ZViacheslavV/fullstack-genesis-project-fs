// import { redirect } from 'next/navigation';

// export type JourneyPageProps = {
//   weekNumber: string;
// };

// export default function JourneyPage({ weekNumber }: JourneyPageProps) {
//   redirect(`/journey/${weekNumber}/baby`);
// }

// import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';

// export default function JourneyPage() {
//   return (
//     <div>
//       <WeekSelector />
//     </div>
// 'use client';

// import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
// import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
// import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';
// // import { notFound } from 'next/navigation';

// type Props = {
//   params: { weekNumber: string };
// };

// export default function JourneyPage({ params }: Props) {
//   const week = Number(params.weekNumber);

//   // if (!week || Number.isNaN(week)) {
//   //   notFound();
//   // }

//   // if (!week || !Number.isInteger(week) || week <= 0) {
//   //   return <h1>Invalid week</h1>;
//   // }

//   return (
//     <>
//       <h1>Hello from JourneyPage</h1>
//       <div>{week}</div>
//       <JourneyDetails
//         baby={<BabyJourney weekNumber={week} />}
//         mom={<MomyJourney weekNumber={week} />}
//       />
//     </>
//   );
// }
'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';

import { useWeekStore } from '@/lib/store/weekStore';

export default function JourneyPage() {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const setCurWeek = useWeekStore((s) => s.setCurWeek);

  const week = Number(weekNumber);

  if (!weekNumber || !Number.isFinite(week) || week < 1) {
    notFound();
  }

  useEffect(() => {
    setCurWeek(week);
  }, [week, setCurWeek]);

  return (
    <>
      <JourneyDetails
        baby={<BabyJourney weekNumber={week} />}
        mom={<MomyJourney weekNumber={week} />}
      />
    </>
  );
}
