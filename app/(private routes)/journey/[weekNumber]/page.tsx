// import { redirect } from 'next/navigation';

// export type JourneyPageProps = {
//   weekNumber: string;
// };

// export default function JourneyPage({ weekNumber }: JourneyPageProps) {
//   redirect(`/journey/${weekNumber}/baby`);
// }

import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';

export default function JourneyPage() {
  return (
    <div>
      <WeekSelector />
    </div>
  );
}
