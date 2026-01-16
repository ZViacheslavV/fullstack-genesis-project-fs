'use client';

import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import ComfortTips, {
  ComfortTipsProps,
} from '@/components/journey/ComfortTips/ComfortTips';
import { getMomWeeks } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { MomState, MomWeeksApiResponse } from '@/types/weeks';
import css from './momyJourney.module.css';
import Feelings from '../Feelings/Feelings';
import LoaderBaby from '@/components/common/Loader/LoaderBaby';

type Props = {
  weekNumber: number;
};

export default function MomyJourney({ weekNumber }: Props) {
  const {
    data: mom,
    isLoading,
    isError,
  } = useQuery<MomWeeksApiResponse, Error, MomState>({
    queryKey: ['mom', weekNumber],
    queryFn: () => getMomWeeks(weekNumber),
    select: (res) => res.data,
    enabled: true,
    refetchOnMount: false,
  });

  if (isLoading) return <LoaderBaby />;
  if (isError || !mom) return null;

  return (
    <>
      <div className={css.container_mom}>
        <div className={css.container_wrap}>
          <Feelings feelings={mom.feelings} />
          <ComfortTips comfortTips={mom.comfortTips as ComfortTipsProps[]} />
        </div>
        <TasksReminderCard hasAuth={true} />
      </div>
    </>
  );
}
