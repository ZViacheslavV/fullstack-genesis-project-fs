'use client';

import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import ComfortTips, {
  ComfortTipsProps,
} from '@/components/journey/ComfortTips/ComfortTips';
import { getMomWeeks } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { MomState, MomWeeksApiResponse } from '@/types/weeks';
import css from './momyJourney.module.css';

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

  if (isLoading) return null;
  if (isError || !mom) return null;

  return (
    <>
      <div className={css.container_mom}>
        <FeelingCheckCard recommendationText="" />
        <ComfortTips comfortTips={mom.comfortTips as ComfortTipsProps[]} />
        <TasksReminderCard />
      </div>
    </>
  );
}
