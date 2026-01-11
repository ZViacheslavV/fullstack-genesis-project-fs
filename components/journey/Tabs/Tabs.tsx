'use client';

import css from './Tabs.module.css';

type Props = {
  active: 'baby' | 'mom';
  onChange: (value: 'baby' | 'mom') => void;
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
        onClick={() => onChange('mom')}
        aria-pressed={active === 'mom'}
        className={css.button}
      >
        Тіло мами
      </button>
    </div>
  );
}
