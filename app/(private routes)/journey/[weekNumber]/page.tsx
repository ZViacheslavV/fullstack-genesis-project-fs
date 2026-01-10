import { redirect } from 'next/navigation';

export type JourneyPageProps = {
  params: { weekNumber: string };
};

export default function JourneyPage({ params }: JourneyPageProps) {
  redirect(`/journey/${params.weekNumber}/baby`);
}
