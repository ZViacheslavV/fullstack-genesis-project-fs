'use client';

import { getWeeks, getWeeksCurrent } from '@/lib/api/clientApi';
import StatusBlock from './StatusBlock/StatusBlock';
import MomTipCard from './MomTipCard/MomTipCard';
import BabyTodayCard from './BabyTodayCard/BabyTodayCard';
import { useQuery } from '@tanstack/react-query';
import LoaderStork from '@/components/common/Loader/LoaderStork';

export default function DashboardClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weeks'],
    queryFn: getWeeksCurrent,
  });
  console.log('RAW weeks response from backend:', data);

  // if (isLoading) return <div>Loading...</div>;
  if (isLoading)
    return <LoaderStork fullScreen={false} size="medium" overlay={true} />;
  if (error || !data) return <div>Error loading weeks</div>;

  const weeksInfo = data.data;

  const baby = weeksInfo.babyState;
  if (!baby) {
    return <div>Baby data is loading...</div>;
  }

  const babySizeText = baby.babySize ? `Розмір: ${baby.babySize}` : '0 см';

  const babyWeightText = baby.babyWeight ? `Вага: ${baby.babyWeight}` : `0 г`;

  const babyActivity = baby.babyActivity
    ? `Активність: ${baby.babyActivity}`
    : `Ітформація про активність малюка скоро буде доступна`;

  const babyDescription = baby.babyDevelopment;

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
        sizeText={babySizeText}
        weightText={babyWeightText}
        babyActivity={babyActivity}
        description={babyDescription}
      />

      <MomTipCard text={tipText} />
    </>
  );
}
