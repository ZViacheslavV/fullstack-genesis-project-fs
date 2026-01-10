'use client';

import css from './DiaryEntryCard.module.css';

// ================== types ==================

export type DiaryEntry = {
  _id: string;
  title: string;
  emotions: string[];      // ключі емоцій (або назви)
  createdAt: string;       // рядок дати
};

type DiaryEntryCardProps = {
  entry: DiaryEntry;
  onClick?: () => void;    // mobile: push, desktop: select
};

// ================== helpers ==================

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

// ================== component ==================

function DiaryEntryCard({ entry, onClick }: DiaryEntryCardProps) {
  return (
    <button
      type="button"
      className={css.card}
      onClick={onClick}
      aria-label={`Відкрити запис: ${entry.title}`}
    >
      <div className={css.top}>
        <h3 className={css.title}>{entry.title}</h3>
        <span className={css.date}>{formatDate(entry.createdAt)}</span>
      </div>

      <div className={css.emotions}>
        {entry.emotions?.length ? (
          entry.emotions.map(emotion => (
            <span key={emotion} className={css.emotion}>
              {emotion}
            </span>
          ))
        ) : (
          <span className={css.emotionMuted}>Без емоцій</span>
        )}
      </div>
    </button>
  );
}

export default DiaryEntryCard;
