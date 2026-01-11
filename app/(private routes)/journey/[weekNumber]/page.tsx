import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';

type Props = {
  params: { weekNumber: string };
};

export default function JourneyPage({ params }: Props) {
  const week = Number(params.weekNumber);
  return <JourneyDetails weekNumber={week} />;
}

///dont render tooo
