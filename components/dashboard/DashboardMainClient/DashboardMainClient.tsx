'use client';

import DashboardCardClient from '@/components/dashboard/DashboardCardClient/DashboardCardClient';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import FeelRecommendationCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';

import css from './DashboardMainClient.module.css';
import { useState } from 'react';
import { useAuthUserStore } from '@/lib/store/authStore';

type Props = {
  hasAuth: boolean;
};

export const DashboardMainClient = ({ hasAuth }: Props) => {
  const [momDailyTip, setMomDailyTip] = useState<string | undefined>('');
  //   const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);

  return (
    <main className={css.dashboard}>
      <GreetingBlock />
      <div className={css.dashboard__content}>
        <div className={css.dashboard__stats}>
          <DashboardCardClient
            onMomDailyTip={setMomDailyTip}
            hasAuth={hasAuth}
          />
        </div>
        <div className={css.dashboard__tasks}>
          <TasksReminderCard hasAuth={hasAuth} />
          <FeelRecommendationCard recommendationText={momDailyTip} />
        </div>
      </div>
    </main>
  );
};
