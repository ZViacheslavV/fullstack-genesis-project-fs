'use client';

import css from './StatusBlock.module.css';

//===========================================================================

  type StatusBlockProps = {
    currentWeek: number;
    daysLeft: number;
  };
  
  const StatusBlock = ({ currentWeek, daysLeft }: StatusBlockProps) => {
  return (
  <div className={css.picker}>
    <div className ={css.cards}>
 <div className={css.card}>
  <div className={css.content}>
    <p className={css.label}>Тиждень</p>
    <p className={css.value}>{currentWeek}</p>
  </div>
</div>
 
<div className={css.card}>
  <div className={css.content}>
    <p className={css.label}>Днів до зустрічі</p>
    <p className={css.value}>~{daysLeft}</p>
  </div>
</div>
</div>
  </div>
  );
};


export default StatusBlock;
