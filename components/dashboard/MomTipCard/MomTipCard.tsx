'use client';

import css from './MomTipCard.module.css';

//===========================================================================
type MomTipCardProps = {
  text: string;
};

const MomTipCard = ({ text }: MomTipCardProps) => {
  return <div className={css.picker}>
       <div className={css.card}>
        <div className={css.content}>
        <p className={css.title}>Порада для мами</p>
      <p className={css.text}>{text}</p>
    </div>
    </div>
  </div>;
}

export default MomTipCard;
