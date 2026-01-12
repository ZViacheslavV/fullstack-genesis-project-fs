'use client';

import { getWeeksCurrent, getWeeksDemo } from '@/lib/api/clientApi';
import StatusBlock from './StatusBlock/StatusBlock';
import MomTipCard from './MomTipCard/MomTipCard';
import { useQuery } from '@tanstack/react-query';
import BabyTodayCard from './BabyTodayCard/BabyTodayCard';

export default function DashboardClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weeks'],
    queryFn: getWeeksDemo,
  });
  // console.log('RAW weeks response from backend:', data);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading weeks</div>;

  const weeksInfo = data.data;
  const baby = weeksInfo.babyState;

  const mom = weeksInfo.momState;
  const tips = mom.comfortTips;

  const tipText =
    tips && tips.length > 0
      ? tips[0].tip
      : 'Порада для мами скоро буде доступна';

  return (
    <>
      <StatusBlock
        currentWeek={weeksInfo.weekNumber}
        daysLeft={weeksInfo.daysLeftToBirth}
      />

      <BabyTodayCard
        imageUrl={baby.image}
        babySize={baby.babySize}
        babyWeight={baby.babyWeight}
        babyActivity={baby.babyActivity}
        description={baby.babyDevelopment}
      />

      <MomTipCard text={tipText} />
    </>
  );
}
