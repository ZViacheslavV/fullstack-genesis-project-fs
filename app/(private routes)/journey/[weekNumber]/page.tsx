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

import { notFound } from 'next/navigation';
import React from 'react';

import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export default async function JourneyPage({ params }: Props) {
  const { weekNumber } = await params;

  const week = Number(weekNumber);

  if (!weekNumber || Number.isNaN(week)) {
    notFound();
  }

  return (
    <>
      <h1>Journey page</h1>
      <div>{week}</div>

      <JourneyDetails
        baby={<BabyJourney weekNumber={week} />}
        mom={<MomyJourney weekNumber={week} />}
      />
    </>
  );
}
