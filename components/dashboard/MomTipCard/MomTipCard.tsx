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
        <h2 className={css.title}>Порада для мами</h2>
      <p className={css.text}>{text}</p>
    </div>
    </div>
  </div>;
}

export default MomTipCard;
