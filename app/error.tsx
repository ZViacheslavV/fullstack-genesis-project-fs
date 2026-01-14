'use client';

import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import css from './error.module.css';

//===========================================================================

type Props = {
  description: string;
  error: Error;
  onRetry?: () => void;
};

//===========================================================================

function GlobalError({ error, onRetry }: Props) {
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
          <div className={css.inner}>
            <div className={css.content}>
              <h2 className={css.title}>Помилка при завантаженні</h2>
              <p className={css.desc}>
                Ми вже розбираємось. Спробуйте повторити дію.
              </p>

              <p className={css.devMsg} title={error.message}>
                {error.message}
              </p>
              <div className={css.actions}>
                <Button onClick={onRetry} size="md">
                  Спробувати знову
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css.right} aria-hidden="true">
        <Image
          src={'/stork-with-nest-and-broken-eggs.jpg'}
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

export default GlobalError;
