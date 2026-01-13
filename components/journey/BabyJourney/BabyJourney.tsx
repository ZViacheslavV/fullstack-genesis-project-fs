'use client';

import Image from 'next/image';
import css from './babyJourney.module.css';
import { getBabyWeeks } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/common/Loader/LoaderBaby';
import { BabyState, WeeksApiResponse } from '@/types/weeks';

type Props = {
  weekNumber: number;
};

export default function BabyJourney({ weekNumber }: Props) {
  const {
    data: baby,
    isLoading,
    isError,
  } = useQuery<WeeksApiResponse, Error, BabyState>({
    queryKey: ['baby', weekNumber],
    queryFn: () => getBabyWeeks(weekNumber),
    select: (res) => res.data.babyState,
    enabled: true,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !baby) return null;

  return (
    <div className={css.container_baby}>
      <div className={css.container_image}>
        {baby.image && (
          <Image
            src={baby.image}
            alt={`Ваш малюк зараз розміром з ${baby.analogy}`}
            width={287}
            height={379}
            className={css.image}
          />
        )}

        <figcaption className={css.text}>
          Ваш малюк зараз розміром з {baby.analogy}
        </figcaption>
      </div>

      <p className={css.text}>{baby.babyDevelopment}</p>
      <p className={css.text}>{baby.babyActivity}</p>

      <div className={css.container_fact}>
        <svg className={css.svg} width={24} height={24}>
          <use href="/icons.svg#info" />
        </svg>
        <h2 className={css.fact_title}>Цікавий факт тижня</h2>
        <p className={css.text}>{baby.interestingFact}</p>
      </div>
    </div>
  );
}
