import React from 'react';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
// import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';

export default function WeekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <GreetingBlock />

      {children}
    </main>
  );
}
