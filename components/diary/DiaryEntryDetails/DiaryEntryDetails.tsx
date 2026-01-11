'use client';

import css from './DiaryEntryDetails.module.css';
import type { DiaryEntry } from '@/types/diary';

type EmotionObj = { _id: string; title: string };
type EmotionValue = EmotionObj | string;

type Props = {
  entry: DiaryEntry | null;
  onEdit?: (entry: DiaryEntry) => void;
  onDelete?: (id: string) => void;
};

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getEmotionKey(e: EmotionValue) {
  return typeof e === 'string' ? e : e._id;
}

function getEmotionLabel(e: EmotionValue) {
  return typeof e === 'string' ? e : e.title;
}

function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  if (!entry) {
    return (
      <div className={css.empty}>
        <p className={css.emptyText}>Оберіть запис зі списку, щоб переглянути деталі.</p>
      </div>
    );
  }

  // якщо у вашому DiaryEntry emotions типізовані інакше — тут робимо “м’яке” приведення
  const emotions = (entry.emotions ?? []) as unknown as EmotionValue[];

  const dateLabel = formatDate(entry.createdAt);

  return (
    <section className={css.wrapper} aria-label="Деталі запису">
      <div className={css.header}>
        <div className={css.headerText}>
          <h2 className={css.title}>{entry.title}</h2>
          {dateLabel ? <p className={css.date}>{dateLabel}</p> : null}
        </div>

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
            className={css.iconBtnDanger}
            onClick={() => onDelete?.(entry._id)}
            aria-label="Видалити запис"
            title="Видалити"
          >
            🗑
          </button>
        </div>
      </div>

      {emotions.length ? (
        <ul className={css.emotions} aria-label="Емоції">
          {emotions.map((e) => (
            <li key={getEmotionKey(e)} className={css.chip} title={getEmotionLabel(e)}>
              {getEmotionLabel(e)}
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noEmotions}>Емоції не обрані</p>
      )}

      <div className={css.noteBox}>
        <p className={css.note}>{entry.note}</p>
      </div>
    </section>
  );
}

export default DiaryEntryDetails;
