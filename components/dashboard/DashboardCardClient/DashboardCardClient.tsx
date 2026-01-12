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
  onMomDailyTip?: (tip: string) => void;
};

export default function DashboardCardClient({ onMomDailyTip }: Props) {
  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);

  const { data, isLoading, error } = useQuery({
    queryKey: ['weeks'],
    queryFn: isAuthenticated ? getWeeksCurrent : getWeeksDemo,
  });
  // console.log('RAW weeks response from backend:', data);

  // if (isLoading) return <div>Loading...</div>;
  if (isLoading)
    return <LoaderStork fullScreen={false} size="medium" overlay={true} />;
  if (error || !data) return <div>Error loading weeks</div>;

  const weeksInfo = data.data;
  const baby = weeksInfo.babyState;

  const mom = weeksInfo.momState;
  const tips = mom.comfortTips;

  const todayIndex = (new Date().getDay() + 6) % 7;
  const momDailyTip = baby.momDailyTips[todayIndex];

  useEffect(() => {
    onMomDailyTip?.(momDailyTip);
  }, [momDailyTip, onMomDailyTip]);

  /*   useEffect(() => {
    if (!baby?.momDailyTips) return;

    const index = (new Date().getDay() + 6) % 7;
    const tip = baby.momDailyTips[index];

    onMomDailyTip?.(tip);
  }, [baby?.momDailyTips, onMomDailyTip]); */

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
