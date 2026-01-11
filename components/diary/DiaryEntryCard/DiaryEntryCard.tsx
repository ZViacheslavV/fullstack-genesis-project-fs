'use client';

import type { MouseEventHandler } from 'react';
import css from './DiaryEntryCard.module.css';
import type { DiaryEntry } from '@/types/diary';

type DiaryEntryCardProps = {
  entry: DiaryEntry;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean; // optional: highlight selected on desktop
};

function formatShortDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function DiaryEntryCard({ entry, onClick, isActive = false }: DiaryEntryCardProps) {
  const date = formatShortDate(entry.createdAt);

  const emotions = Array.isArray(entry.emotions) ? entry.emotions : [];
  const visible = emotions.slice(0, 2);
  const rest = emotions.length - visible.length;

  return (
    <button
      type="button"
      className={`${css.card} ${isActive ? css.active : ''}`}
      onClick={onClick}
      aria-label={`Відкрити запис: ${entry.title}`}
    >
      <div className={css.topRow}>
        <h4 className={css.title}>{entry.title}</h4>
        <time className={css.date} dateTime={entry.createdAt}>
          {date}
        </time>
      </div>

      {emotions.length > 0 && (
        <ul className={css.emotions} aria-label="Емоції запису">
          {visible.map((emotion) => (
            <li key={emotion} className={css.emotion}>
              {emotion}
            </li>
          ))}

          {rest > 0 && <li className={css.more}>+{rest}</li>}
        </ul>
      )}
    </button>
  );
}

export default DiaryEntryCard;
