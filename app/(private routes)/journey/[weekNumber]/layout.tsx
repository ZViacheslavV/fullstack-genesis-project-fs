import React from 'react';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import Header from '@/components/layout/Header/Header';

type Props = {
  children: React.ReactNode;
  params: { weekNumber: string };
};

export default function JourneyLayout({ children }: Props) {
  return (
    <section>
      <Header />
      <GreetingBlock />
      <WeekSelector />
      {children}
    </section>
  );
}
