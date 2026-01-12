import type { Metadata } from 'next';

import ButtonLink from '@/components/common/Button/ButtonLink';
import css from './not-found.module.css';

//===========================================================================

export const metadata: Metadata = {
  title: '404 | Сторінку не знайдено — Лелека',
  description:
    'Сторінка не існує або була переміщена. Поверніться на головну сторінку додатку Лелека.',
};

//===========================================================================

function NotFound() {
  return (
    <section className={css.section}>
      <div className={css.card}>
        <div className={css.badge} aria-hidden="true">
          404
        </div>

        <h1 className={css.title}>Сторінку не знайдено</h1>

        <p className={css.description}>
          Сторінка, яку ви шукаєте, не існує, була переміщена або посилання не
          працює.
        </p>

        <div className={css.actions}>
          <ButtonLink href="/" variant="normal" size="md">
            Назад додому
          </ButtonLink>

          <ButtonLink href="/auth/login" variant="cancel" size="md">
            На вхід
          </ButtonLink>
        </div>
      </div>

      <div className={css.bgDecor} aria-hidden="true" />
    </section>
  );
}

export default NotFound;
