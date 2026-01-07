'use client';

import css from './DiaryEntryDetails.module.css';

type DiaryEntryDetailsProps = {
  title?: string;
  date?: string;
  text?: string;
};

export default function DiaryEntryDetails({ title, date, text }: DiaryEntryDetailsProps) {
  // Якщо запис не обраний
  if (!title) {
    return (
      <section className={css.picker}>
        <p className={css.placeholder}>Наразі записи у щоденнику відстні</p>
      </section>
    );
  }

  return (
    <section className={css.picker}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.date}>{date}</p>

      <p className={css.text}>{text}</p>

      <div className={css.actions}>
        <button type="button">Редагувати</button>
        <button type="button">Видалити</button>
      </div>
    </section>
  );
}
