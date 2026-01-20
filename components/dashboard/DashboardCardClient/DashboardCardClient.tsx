'use client';

import { getWeeksCurrent, getWeeksDemo } from '@/lib/api/clientApi';
import StatusBlock from '../StatusBlock/StatusBlock';
import MomTipCard from '../MomTipCard/MomTipCard';
import { useQuery } from '@tanstack/react-query';
import BabyTodayCard from '@/components/dashboard/BabyTodayCard/BabyTodayCard';
import { useEffect } from 'react';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import { LoaderStork } from '@/components/common/Loader';

type Props = {
  onMomDailyTip?: (tip: string | undefined) => void;
  hasAuth: boolean;
};

export default function DashboardCardClient({
  onMomDailyTip,
  hasAuth,
}: Props) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['weeks'],
    queryFn: hasAuth ? getWeeksCurrent : getWeeksDemo,
    refetchOnMount: false,
  });

  const todayIndex = (new Date().getDay() + 6) % 7;
  const momDailyTip = data?.data?.babyState?.momDailyTips?.[todayIndex];

  useEffect(() => {
    onMomDailyTip?.(momDailyTip);
  }, [momDailyTip, onMomDailyTip]);

  if (isLoading) {
    return <LoaderStork/>; 
  }


  if (error) {
    return (
      <ErrorState
        reset={refetch}
        title="Не вдалося завантажити дані"
        description="Спробуйте ще раз або перевірте зʼєднання з інтернетом."
      />
    );
  }

  if (!data) {
    return null;
  }

  const weeksInfo = data.data;
  const baby = weeksInfo.babyState;
  const mom = weeksInfo.momState;

  const tipText =
    mom.comfortTips?.length > 0
      ? mom.comfortTips[0].tip
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
