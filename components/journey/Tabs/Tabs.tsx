'use client';

import css from './Tabs.module.css';

type Props = {
  active: 'baby' | 'momy';
  onChange: (value: 'baby' | 'momy') => void;
};

export default function Tabs({ active, onChange }: Props) {
  return (
    <div className={css.container_tab}>
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
    </div>
  );
}
