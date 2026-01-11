import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import ComfortTips, {
  ComfortTipsProps,
} from '@/components/journey/ComfortTips/ComfortTips';
import { getJourneyData } from '@/lib/api/clientApi';

type Props = {
  weekNumber: number;
};

const MomyJourney = async ({ weekNumber }: Props) => {
  const data = await getJourneyData(weekNumber, 'momy');

  return (
    <>
      <FeelingCheckCard />
      <ComfortTips comfortTips={data.comfortTips as ComfortTipsProps[]} />
      <TasksReminderCard />
    </>
  );
};

export default MomyJourney;
