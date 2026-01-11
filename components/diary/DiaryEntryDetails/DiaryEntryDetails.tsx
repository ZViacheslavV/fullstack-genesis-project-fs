'use client';

import css from './DiaryEntryDetails.module.css';
import type { DiaryEntry } from '@/types/diary';

type DiaryEntryDetailsProps = {
  entry?: DiaryEntry | null;
  onEdit?: (entry: DiaryEntry) => void;
  onDelete?: (entry: DiaryEntry) => void;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function DiaryEntryDetails({
  entry,
  onEdit,
  onDelete,
}: DiaryEntryDetailsProps) {
  if (!entry) {
    return (
      <section className={css.empty} aria-label="Деталі запису щоденника">
        <p className={css.emptyText}>Наразі записи у щоденнику відсутні</p>
      </section>
    );
  }

  const createdAt = formatDate(entry.createdAt);

  return (
    <section className={css.wrapper} aria-label="Деталі запису щоденника">
      <header className={css.header}>
        <h3 className={css.title}>{entry.title}</h3>

        <div className={css.metaRow}>
          <time className={css.date} dateTime={entry.createdAt}>
            {createdAt}
          </time>

          <div className={css.actions}>
            <button
              type="button"
              className={css.iconBtn}
              onClick={() => onEdit?.(entry)}
              aria-label="Редагувати запис"
              title="Редагувати"
            >
              ✎
            </button>

            <button
              type="button"
              className={css.iconBtn}
              onClick={() => onDelete?.(entry)}
              aria-label="Видалити запис"
              title="Видалити"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      <div className={css.content}>
        <p className={css.note}>{entry.note}</p>
      </div>

      {entry.emotions?.length > 0 && (
        <ul className={css.emotions} aria-label="Емоції">
          {entry.emotions.map((emotion) => (
            <li key={emotion} className={css.emotion}>
              {emotion}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DiaryEntryDetails;
