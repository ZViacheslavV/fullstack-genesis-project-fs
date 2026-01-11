import type { Metadata } from 'next';
import css from './page.module.css';
import DashboardClient from '@/components/dashboard/DashboardClient';
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
    <section className={css.hero}>
      <div>
        <GreetingBlock />
        <DashboardClient />
      </div>
      <div>
        {<TasksReminderCard />}
        {/* <Toaster position="top-right" /> */}
        <FeelRecommendationCard recommendationText="" />
      </div>
    </section>
  );
}

export default Home;
