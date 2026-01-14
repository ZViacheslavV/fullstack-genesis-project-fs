'use client';

import { getWeeksCurrent, getWeeksDemo } from '@/lib/api/clientApi';
import StatusBlock from '../StatusBlock/StatusBlock';
import MomTipCard from '../MomTipCard/MomTipCard';
import { useQuery } from '@tanstack/react-query';
import LoaderStork from '@/components/common/Loader/LoaderStork';
import BabyTodayCard from '@/components/dashboard/BabyTodayCard/BabyTodayCard';
import { useAuthUserStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  onMomDailyTip?: (tip: string | undefined) => void;
  hasAuth: boolean;
};

export default function DashboardCardClient({ onMomDailyTip, hasAuth }: Props) {
  // const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);

  const { data, isLoading, error } = useQuery({
    queryKey: ['weeks'],
    queryFn: hasAuth ? getWeeksCurrent : getWeeksDemo,
    refetchOnMount: false,
  });
  // console.log('RAW weeks response from backend:', data);

  const tipData = data?.data?.babyState;

  const todayIndex = (new Date().getDay() + 6) % 7;
  const momDailyTip = tipData?.momDailyTips?.[todayIndex];

  useEffect(() => {
    onMomDailyTip?.(momDailyTip);
  }, [momDailyTip, onMomDailyTip]);

  // console.log('RAW weeks response from backend:', data);

  // if (isLoading) return <div>Loading...</div>;
  // if (isLoading)
  //   return <LoaderStork fullScreen={false} size="medium" overlay={true} />;
  if (isLoading) {
    return <LoaderStork fullScreen overlay size="medium" />;
  }
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
