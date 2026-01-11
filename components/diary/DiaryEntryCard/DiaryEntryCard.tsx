'use client';

import css from './DiaryEntryCard.module.css';
import type { DiaryEntry } from '@/types/diary';

type EmotionObj = { _id: string; title: string };
type EmotionValue = EmotionObj | string;

type Props = {
  entry: DiaryEntry;
  isActive?: boolean;
  onClick: () => void;
};

function formatDateShort(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function DiaryEntryCard({ entry, isActive = false, onClick }: Props) {
  const emotions = (entry.emotions ?? []) as unknown as EmotionValue[];

  const dateLabel = formatDateShort(entry.createdAt);

  return (
    <button
      type="button"
      className={`${css.card} ${isActive ? css.active : ''}`}
      onClick={onClick}
    >
      <div className={css.topRow}>
        <h3 className={css.title} title={entry.title}>
          {entry.title}
        </h3>

        {dateLabel ? <p className={css.date}>{dateLabel}</p> : null}
      </div>

      <div className={css.bottomRow}>
        {emotions.length ? (
          <ul className={css.emotions} aria-label="Емоції">
            {emotions.slice(0, 6).map((e) => {
              const key = typeof e === 'string' ? e : e._id;
              const label = typeof e === 'string' ? e : e.title;

              return (
                <li key={key} className={css.chip} title={label}>
                  {label}
                </li>
              );
            })}

            {emotions.length > 6 ? (
              <li className={css.more} aria-label="Більше емоцій">
                +{emotions.length - 6}
              </li>
            ) : null}
          </ul>
        ) : (
          <p className={css.noEmotions}>Без емоцій</p>
        )}
      </div>
    </button>
  );
}

export default DiaryEntryCard;
