'use client';

import css from './ComfortTips.module.css';

//===========================================================================

export enum ComfortCategory {
  Food = 'Харчування',
  Activity = 'Активність',
  Rest = 'Відпочинок та комфорт',
}

export type ComfortTipsProps = {
  category: ComfortCategory;
  tip: string;
};

type Props = {
  comfortTips: ComfortTipsProps[];
};

const ICONS_MAP: Record<ComfortCategory, string> = {
  [ComfortCategory.Food]: 'icon-food',
  [ComfortCategory.Activity]: 'icon-activity',
  [ComfortCategory.Rest]: 'icon-rest',
};

function ComfortTips({ comfortTips }: Props) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Поради для вашого комфорту</h2>
      <ul>
        {comfortTips.map((item, index) => (
          <li key={index} className={css.item}>
            <svg className={css.svg} width={24} height={24} aria-hidden>
              <use href={`/sprite.svg#${ICONS_MAP[item.category]}`} />
            </svg>
            <div>
              <h3 className={css.item_title}>{item.category}</h3>
              <p className={css.item_text}>{item.tip}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComfortTips;
