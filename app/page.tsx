import type { Metadata } from 'next';
import css from './page.module.css';
import StatusBlock from '@/components/dashboard/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/dashboard/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/dashboard/MomTipCard/MomTipCard';
import { Toaster } from 'react-hot-toast';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';

//===========================================================================

export const metadata: Metadata = {};

//===========================================================================

function Home() {
  const tipText =
  'Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок.';

  return (
    <section className={css.hero}>
      <div>
        {/*<GreetingBlock />*/}
        { <StatusBlock currentWeek={14} daysLeft={165} /> }
        { <BabyTodayCard
  imageUrl="/images/avocado.png"
  sizeText="Ваш малюк зараз розміром з авокадо"
  description="Його кісточки починають тверднути, а рухи стають більш скоординованими."
/>
}
        <MomTipCard text={tipText} /> 
      </div>
      <div>
        {<TasksReminderCard />}
        <Toaster position="top-right" />
        {/*<FeelingCheckCard/>*/}
      </div>
    </section>
  );
}

export default Home;
