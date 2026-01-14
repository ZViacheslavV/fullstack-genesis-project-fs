import React from 'react';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
import Header from '@/components/layout/Header/Header';

export default function WeekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <GreetingBlock />
      <WeekSelector />
      {children}
    </section>
  );
}
