'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import css from './error.module.css';

//===========================================================================

type Props = {
  error: Error;
  reset: () => void;
};

//===========================================================================

function GlobalError({ error, reset }: Props) {
  const router = useRouter();

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

              <ul className={css.actions}>
                <li>
                  <Button onClick={reset} size="md">
                    Спробувати знову
                  </Button>
                </li>

                <li>
                  <Button
                    variant="cancel"
                    size="md"
                    onClick={() => router.back()}
                  >
                    Повернутися назад
                  </Button>
                </li>
              </ul>
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
