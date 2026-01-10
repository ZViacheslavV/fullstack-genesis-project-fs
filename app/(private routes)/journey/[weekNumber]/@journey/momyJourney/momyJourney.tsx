import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
import ComfortTips from '@/components/journey/ComfortTips/ComfortTips';
import { JourneyPageProps } from '../../page';
import { getJourneyData } from '@/lib/api/clientApi';

const MomyJourney = async ({ params }: JourneyPageProps) => {
  const week = Number(params.weekNumber);

  const data = await getJourneyData(week, 'momy');

  return (
    <>
      <FeelingCheckCard />
      <ComfortTips comfortTips={data.comfortTips} />
      <TasksReminderCard />
    </>
  );
};

export default MomyJourney;
