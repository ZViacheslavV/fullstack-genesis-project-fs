'use client';

import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import css from './Tabs.module.css';
import Link from 'next/link';

export default function Tabs() {
  const params = useParams<{ weekNumber: string }>();
  const active = useSelectedLayoutSegment();

  const week = params.weekNumber;

  return (
    <div className={css.container_tab}>
      <Link
        href={`/journey/${week}/baby`}
        aria-current={active === 'baby'}
        className={css.button}
      >
        Розвиток малюка
      </Link>

      <Link
        href={`/journey/${week}/momy`}
        aria-current={active === 'momy'}
        className={css.button}
      >
        Тіло мами
      </Link>
    </div>
  );
}

{
  /* <div className={css.container_tab}>
      <button
        onClick={() => onChange('baby')}
        aria-pressed={active === 'baby'}
        className={css.button}
      >
        Розвиток малюка
      </button>

      <button
        onClick={() => onChange('momy')}
        aria-pressed={active === 'momy'}
        className={css.button}
      >
        Тіло мами
      </button>
    </div> */
}
