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
  [ComfortCategory.Food]: 'icon-fork-spoon',
  [ComfortCategory.Activity]: 'icon-fitness-center',
  [ComfortCategory.Rest]: 'icon-chair',
};

function ComfortTips({ comfortTips }: Props) {
  return (
    <div className={css.container_tips}>
      <h2 className={css.title}>Поради для вашого комфорту</h2>
      <ul className={css.item}>
        {comfortTips.map((item, index) => (
          <li key={index}>
            <div className={css.container_wrap}>
              <div className={css.container_svg}>
                <svg width={24} height={24}>
                  <use href={`/icons.svg#${ICONS_MAP[item.category]}`} />
                </svg>
              </div>

              <h3 className={css.item_title}>{item.category}</h3>
            </div>

            <p className={css.item_text}>{item.tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComfortTips;
