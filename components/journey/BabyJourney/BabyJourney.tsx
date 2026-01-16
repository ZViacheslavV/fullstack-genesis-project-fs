'use client';

import Image from 'next/image';
import css from './babyJourney.module.css';
import { getBabyWeeks } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { BabyState, BabyWeeksApiResponse } from '@/types/weeks';
import LoaderBaby from '@/components/common/Loader/LoaderBaby';

type Props = {
  weekNumber: number;
};

export default function BabyJourney({ weekNumber }: Props) {
  const {
    data: baby,
    isLoading,
    isError,
  } = useQuery<BabyWeeksApiResponse, Error, BabyState>({
    queryKey: ['baby', weekNumber],
    queryFn: () => getBabyWeeks(weekNumber),
    select: (res) => res.data,
    enabled: true,
    refetchOnMount: false,
  });

  if (isLoading) return <LoaderBaby />;
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
        {weekNumber !== 1 && (
          <figcaption className={css.text}>
            Ваш малюк зараз розміром як {baby.analogy}
          </figcaption>
        )}
      </div>
      <div className={css.container_wrap}>
        <div className={css.container_text}>
          <p className={css.text}>{baby.babyDevelopment}</p>
          <p className={css.text}>{baby.babyActivity}</p>
        </div>

        <div className={css.container_fact}>
          <div className={css.container_fact_svg}>
            <svg width={24} height={24}>
              <use href="/icons.svg#icon-star-shine" />
            </svg>
          </div>
          <h2 className={css.fact_title}>Цікавий факт тижня</h2>
          <p className={css.text}>{baby.interestingFact}</p>
        </div>
      </div>
    </div>
  );
}
