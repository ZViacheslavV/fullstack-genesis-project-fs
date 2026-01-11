export type JourneyPageProps = {
  weekNumber: string;
};

export default function JourneyPage({ weekNumber }: JourneyPageProps) {}

// import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
// import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
// import ComfortTips, {
//   ComfortTipsProps,
// } from '@/components/journey/ComfortTips/ComfortTips';
// import { getJourneyData } from '@/lib/api/clientApi';

// type Props = {
//   params: { weekNumber: string };
// };

// const MomyJourney = async ({ params }: Props) => {
//   const week = Number(params.weekNumber);

//   const data = await getJourneyData(week, 'momy');

//   return (
//     <>
//       <FeelingCheckCard />
//       <ComfortTips comfortTips={data.comfortTips as ComfortTipsProps[]} />
//       <TasksReminderCard />
//     </>
//   );
// };

// export default MomyJourney;
