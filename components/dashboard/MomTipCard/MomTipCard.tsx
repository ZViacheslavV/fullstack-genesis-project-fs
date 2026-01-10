'use client';

import css from './MomTipCard.module.css';

//===========================================================================
type MomTipCardProps = {
  text: string;
};

const MomTipCard = ({ text }: MomTipCardProps) => {
  return <div className={css.picker}>
       <div className={css.card}>
        <p className={css.title}>Порада для мами</p>
      <p className={css.text}>{text}</p>
    </div>
  </div>;
}

export default MomTipCard;
