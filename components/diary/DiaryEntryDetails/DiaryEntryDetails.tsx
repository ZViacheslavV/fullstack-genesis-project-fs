'use client';

import css from './DiaryEntryDetails.module.css';
import type { DiaryEntry } from '@/types/diary';
import { useEffect } from 'react';

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

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  useEffect(() => {
    if (!entry) return;
    document.body.dataset.diaryId = entry._id;
    document.body.dataset.diaryTitle = entry.title;
    return () => {
      delete document.body.dataset.diaryId;
      delete document.body.dataset.diaryTitle;
    };
  }, [entry]);
  
  if (!entry) {
    return (
      <div className={css.empty}>
        <p className={css.emptyText}>
          Оберіть запис зі списку, щоб переглянути деталі.
        </p>
      </div>
    );
  }

  const emotions = (entry.emotions ?? []) as unknown as EmotionValue[];
  const dateLabel = formatDate(entry.createdAt);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.left}>
          <h2 className={css.title} title={entry.title}>
            {entry.title}
          </h2>

          <button
            type="button"
            className={css.iconBtn}
            onClick={() => onEdit?.(entry)}
            aria-label="Редагувати запис"
          >
            <svg width="24" height="24">
              <use href="/icons.svg#icon-edit-square" />
            </svg>
          </button>
        </div>

        <div className={css.right}>
          {dateLabel ? <span className={css.date}>{dateLabel}</span> : null}

          <button
            type="button"
            className={css.iconBtn}
            onClick={() => onDelete?.(entry._id)}
            aria-label="Видалити запис"
          >
            <svg width="24" height="24">
              <use href="/icons.svg#icon-delete-forever" />
            </svg>
          </button>
        </div>
      </div>

      <div className={css.noteBox}>
        {entry.description ? (
          <p className={css.note}>{entry.description}</p>
        ) : (
          <p className={css.note} style={{ opacity: 0.5 }}>
            Текст запису відсутній.
          </p>
        )}

        {emotions.length ? (
          <ul className={css.emotions} aria-label="Емоції">
            {emotions.map((e) => (
              <li
                key={getEmotionKey(e)}
                className={css.chip}
                title={getEmotionLabel(e)}
              >
                {getEmotionLabel(e)}
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.noEmotions}>Емоції не обрані</p>
        )}
      </div>
    </div>
  );
}
