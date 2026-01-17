// const JourneyPage = () => {
//   return <h1>JourneyPageMainRedirect</h1>;
// };

// export default JourneyPage;
// import { redirect } from 'next/navigation';

// export default function JourneyIndexPage() {
//   redirect('/journey/1');
// }

import { redirect } from 'next/navigation';
import { getWeeksCurrentServer } from '@/lib/api/serverApi';

export default async function JourneyIndexPage() {
  try {
    const res = await getWeeksCurrentServer();
    const week = Number(res.data?.weekNumber);

    if (Number.isFinite(week) && week >= 1) {
      redirect(`/journey/${week}`);
    }
  } catch (e) {}

  redirect('/journey/1');
}
