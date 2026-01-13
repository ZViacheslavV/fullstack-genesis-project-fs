// import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
// import WeekSelector from '@/components/journey/WeekSelector/WeekSelector';
// import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
// import Header from '@/components/layout/Header/Header';
// import Tabs from '@/components/journey/Tabs/Tabs';

// export type JourneyLayoutProps = {
//   journey: React.ReactNode;
//   params: { weekNumber: string }; //?????
// };

// export async function JourneyLayout({ journey, params }: JourneyLayoutProps) {
//   const week = Number(params.weekNumber);

//   return (
//     <section>
//       <Header />
//       <Breadcrumbs />
//       <GreetingBlock />
//       <WeekSelector />

//       <Tabs weekNumber={week} />

//       {journey}
//     </section>
//   );
// }
// app/journey/[weekNumber]/layout.tsx
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
      <Breadcrumbs />
      <GreetingBlock />
      <WeekSelector />
      {children}
    </section>
  );
}

