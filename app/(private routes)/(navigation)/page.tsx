'use client'; //TODO This is  Dashboard MVP of main page, needs many improvements

// import type { Metadata } from 'next';
import css from './page.module.css';
import DashboardCardClient from '@/components/dashboard/DashboardCardClient/DashboardCardClient';
//import { Toaster } from 'react-hot-toast';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
// import moduleName from 'module';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import FeelRecommendationCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import { useState } from 'react';

//===========================================================================

// export const metadata: Metadata = {};

//===========================================================================

function Home() {
  const [momDailyTip, setMomDailyTip] = useState<string | undefined>('');

  return (
    <section className={css.dashboard}>
      {/* <div className={css.dashboard__inner}> */}
      <GreetingBlock />
      <div className={css.dashboard__content}>
        <div className={css.dashboard__stats}>
          <DashboardCardClient onMomDailyTip={setMomDailyTip} />
        </div>
        <div className={css.dashboard__tasks}>
          <TasksReminderCard />
          {/* <Toaster position="top-right" /> */}
          <FeelRecommendationCard recommendationText={momDailyTip} />
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}
export default Home;
