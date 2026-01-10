'use client';

import css from './BabyTodayCard.module.css';

//===============================================================
type BabyTodayCardProps = {
  imageUrl: string;
  sizeText: string;
  description: string;
};

  const BabyTodayCard = ({
    imageUrl,
    sizeText,
    description,
  }: BabyTodayCardProps) => {
  return <div className={css.backdrop}>
      <div className={css.card}>
      <p className={css.babyToday}>Малюк сьогодні</p>

      <div className={css.top}>
      <div className={css.imageWrapper}>
        <img src={imageUrl} alt="Baby illustration" />
      </div>
        <p className={css.size}>{sizeText}</p>
      </div>
      
        <p className={css.description}>{description}</p>
    </div>
  </div>;
}

export default BabyTodayCard;
