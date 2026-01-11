import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';

type Props = {
  params: { weekNumber: string };
};

export default async function JourneyPage({ params }: Props) {
  const { weekNumber } = await params;
  return (
    <>
      <h1>Hello from JourneyPage</h1>
      <div>{weekNumber}</div>
      {/* <JourneyDetails weekNumber={Number(weekNumber)} /> */}
    </>
  );
}

//dont render tooo
