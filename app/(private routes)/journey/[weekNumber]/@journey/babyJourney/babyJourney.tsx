import Image from 'next/image';

import css from './babyJourney.module.css';
import { getJourneyData } from '@/lib/api/clientApi';

type Props = {
  params: { weekNumber: string };
};

const BabyJourney = async ({ params }: Props) => {
  const week = Number(params.weekNumber);

  const data = await getJourneyData(week, 'baby');

  return (
    <>
      <div className={css.container_baby}>
        <div className={css.container_image}>
          <Image
            src={data.image}
            alt={`Ваш малюк зараз розміром з ${data.analogy}`}
            width={287}
            height={379}
            className={css.image}
          />
          <figcaption className={css.text}>
            Ваш малюк зараз розміром з {data.analogy}
          </figcaption>
        </div>
        <p className={css.text}>{data.babyDevelopment}</p>
        <p className={css.text}>{data.babyActivity}</p>
        <div className={css.container_fact}>
          <svg className={css.svg} width={24} height={24}>
            <use href="" />
          </svg>
          <h2 className={css.fact_title}>Цікавий факт тижня</h2>
          <p className={css.text}>{data.interestingFact}</p>
        </div>
      </div>
    </>
  );
};

export default BabyJourney;
