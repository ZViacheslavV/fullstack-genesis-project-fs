import { redirect } from 'next/navigation';

export type JourneyPageProps = {
  weekNumber: string;
};

export default function JourneyPage({ weekNumber }: JourneyPageProps) {
  redirect(`/journey/${weekNumber}/baby`);
}
