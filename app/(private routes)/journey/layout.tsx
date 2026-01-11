import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import Header from '@/components/layout/Header/Header';
import Tabs from '@/components/journey/Tabs/Tabs';

export type JourneyLayoutProps = {
  children: React.ReactNode;
  params: { weekNumber: string };
};

export default async function JourneyLayout({
  children,
  params,
}: JourneyLayoutProps) {
  const week = Number(params.weekNumber);
  if (!params.weekNumber || Number.isNaN(week)) {
    return null;
  }

  return (
    <section>
      <Header />
      <Breadcrumbs />
      <GreetingBlock />
      <WeekSelector />

      <Tabs />

      {children}
    </section>
  );
}

// export type JourneyLayoutProps = {
//   children: React.ReactNode;
//   journey: React.ReactNode;
//   params: { weekNumber: string };
// };

// export default async function JourneyLayout({
//   children,
//   journey,
//   params,
// }: JourneyLayoutProps) {
//   const week = Number(params.weekNumber);
//   if (!params.weekNumber || Number.isNaN(week)) {
//     return null;
//   }
//   return (
//     <section>
//       {journey}
//       {children}
//       <Tabs weekNumber={week} />
//     </section>
//   );
// }
