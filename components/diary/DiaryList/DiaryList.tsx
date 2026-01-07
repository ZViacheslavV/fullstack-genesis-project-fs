'use client';

import css from './DiaryList.module.css';

export default function DiaryList() {
  return (
    <section className={css.picker}>
      <h1 className={css.title}>Щоденник</h1>

      <button type="button" className={css.addButton}>
        Новий запис
      </button>

      <ul className={css.list}>
        <li>Запис 1</li>
        <li>Запис 2</li>
        <li>Запис 3</li>
      </ul>
    </section>
  );
}
