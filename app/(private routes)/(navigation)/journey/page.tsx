// const JourneyPage = () => {
//   return <h1>JourneyPageMainRedirect</h1>;
// };

// export default JourneyPage;
import { redirect } from 'next/navigation';

export default function JourneyIndexPage() {
  redirect('/journey/1');
}
