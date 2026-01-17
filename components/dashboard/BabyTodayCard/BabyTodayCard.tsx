import css from './BabyTodayCard.module.css';
import Image from 'next/image';


type BabyTodayCardProps = {
  imageUrl: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  description: string;
};

const BabyTodayCard = ({
  imageUrl,
  babySize,
  babyWeight,
  babyActivity,
  description,
}: BabyTodayCardProps) => {
  return (
    <div className={css.card}>
       <div className={css.content}>
      <h2 className={css.babyToday}>Малюк сьогодні</h2>

      <div className={css.top}>
        <div className={css.imageWrapper}>
          <Image
    src={imageUrl}
    alt="Baby illustration"
    width={257}
    height={194}
    className={css.image}
    
  />
        </div>
        <div className={css.params}>
          <p className={css.row}>
            <span className={css.label}>Розмір: </span>
            <span className={css.value}>{babySize} см</span>
          </p>

          <p className={css.row}>
            <span className={css.label}>Вага: </span>
            <span className={css.value}>{babyWeight} грамів</span>
          </p>

          <p className={css.row}>
            <span className={css.label}>Активність: </span>
            <span className={css.value}>{babyActivity}</span>
          </p>
        </div>
      </div>

      <p className={css.description}>{description}</p>
    </div>
    </div>
  );
};

export default BabyTodayCard;
