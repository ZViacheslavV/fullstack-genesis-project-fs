'use client';

// import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import ComfortTips, {
  ComfortTipsProps,
} from '@/components/journey/ComfortTips/ComfortTips';
import { getMomWeeks } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

type Props = {
  weekNumber: number;
};

export default function MomyJourney({ weekNumber }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['mom', weekNumber],
    queryFn: () => getMomWeeks(weekNumber),
    enabled: !!weekNumber,
  });

  if (isLoading) return null;
  if (isError || !data) return null;

  const mom = data.data.momState;

  return (
    <>
      {/* <FeelingCheckCard /> */}
      <ComfortTips comfortTips={mom.comfortTips as ComfortTipsProps[]} />
      <TasksReminderCard />
    </>
  );
}
