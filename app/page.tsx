import type { Metadata } from 'next';
import css from './page.module.css';

//===========================================================================

export const metadata: Metadata = {};

//===========================================================================

function Home() {
  return (
    <section className={css.hero}>
      <div>
        {/*<GreetingBlock />*/}
        {/*<StatusBlock />*/}
        {/*<BabyTodayCard />*/}
        {/*<MomTipCard />*/}
      </div>
      <div>
        {/*<TasksReminderCard />*/}
        {/*<FeelingCheckCard/>*/}
      </div>
    </section>
  );
}

export default Home;
