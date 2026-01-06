import type { Metadata } from 'next';
import Link from 'next/link';

import css from './not-found.module.css';

//===========================================================================

export const metadata: Metadata = {};

//===========================================================================

function NotFound() {
  return (
    <section className={css.container}>
      <div className={css.card}>
        <p className={css.code}>404</p>
        <h1 className={css.title}>Сторінку не знайдено</h1>
        <p className={css.description}>
          Сторінка, яку ви шукаєте, не існує, або була переміщена, або посилання не працює.
        </p>

        <div className={css.actions}>
          <Link href="/">Назад додому</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
