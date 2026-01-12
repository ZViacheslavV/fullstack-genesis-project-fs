import BabyJourney from '@/components/journey/BabyJourney/BabyJourney';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import MomyJourney from '@/components/journey/MomyJourney/MomyJourney';
// import { notFound } from 'next/navigation';

type Props = {
  params: { weekNumber: string };
};

export default function JourneyPage({ params }: Props) {
  const week = Number(params.weekNumber);

  // if (Number.isNaN(week)) {
  //   notFound();
  // }

  // if (!week || Number.isNaN(week)) {
  //   notFound();
  // }

  if (!week || !Number.isInteger(week) || week <= 0) {
    return <h1>Invalid week</h1>;
  }

  return (
    <>
      <h1>Hello from JourneyPage</h1>
      <div>{week}</div>
      <JourneyDetails
        baby={<BabyJourney weekNumber={week} />}
        mom={<MomyJourney weekNumber={week} />}
      />
    </>
  );
}
