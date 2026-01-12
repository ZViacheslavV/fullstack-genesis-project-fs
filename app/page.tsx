import type { Metadata } from 'next';
import css from './page.module.css';
import DashboardClient from '@/components/dashboard/DashboardCardClient/DashboardCardClient';
//import { Toaster } from 'react-hot-toast';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
// import moduleName from 'module';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import FeelRecommendationCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';

//===========================================================================

export const metadata: Metadata = {};

//===========================================================================

function Home() {
  return (
    <section className={css.dashboard}>
      <div className={css.dashboard__inner}>
        <GreetingBlock />
        <div className={css.dashboard__content}>
          <div className={css.dashboard__stats}>
            <DashboardClient />
          </div>
          <div className={css.dashboard__tasks}>
            <TasksReminderCard />
            {/* <Toaster position="top-right" /> */}
            <FeelRecommendationCard recommendationText="" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Home;
