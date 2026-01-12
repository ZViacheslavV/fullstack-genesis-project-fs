import css from './BabyTodayCard.module.css';

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
      <p className={css.babyToday}>Малюк сьогодні</p>

      <div className={css.top}>
        <div className={css.imageWrapper}>
          {/* //TODO: need Image */}
          <img src={imageUrl} alt="Baby illustration" />
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
  );
};

export default BabyTodayCard;
