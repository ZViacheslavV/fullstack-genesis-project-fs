import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
    <section className={css.page}>
      <div className={css.left}>
        <div className={css.logoRow}>
          <Link href="/">
            <Image
              src="/company-logo.svg"
              alt="Лелека"
              width={105}
              height={45}
              priority
            />
          </Link>
        </div>

        <div className={css.formWrap}>
          <p className={css.code} aria-hidden="true">
            404
          </p>

          <h1 className={css.title}>Ой лишенько!</h1>
          <p className={css.subtitle}>Сторінку не знайдено.</p>

          <p className={css.text}>Спробуйте повернутися на основну сторінку.</p>

          <ButtonLink href="/" size="md">
            На головну
          </ButtonLink>
        </div>
      </div>

      <div className={css.right} aria-hidden="true">
        <Image
          src={'/stork-near-its-nest.jpg'}
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 40vw, 0px"
          className={css.illustration}
        />
      </div>
    </section>
  );
}

export default NotFound;
