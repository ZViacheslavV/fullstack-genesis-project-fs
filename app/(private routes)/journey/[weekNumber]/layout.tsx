import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import Header from '@/components/layout/Header/Header';
import Tabs from '@/components/journey/Tabs/Tabs';

export type JourneyLayoutProps = {
  children: React.ReactNode;
  params: { weekNumber: string }; //?????
};

export default async function JourneyLayout({
  children,
  params,
}: JourneyLayoutProps) {
  const week = Number(params.weekNumber);

  return (
    <section>
      <Header />
      <Breadcrumbs />
      <GreetingBlock />
      <WeekSelector />

      <Tabs weekNumber={week} />

      {children}
    </section>
  );
}
