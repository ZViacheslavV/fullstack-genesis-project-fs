'use client';

import Button from '@/components/common/Button/Button';
import css from './Tabs.module.css';
import { useRef } from 'react';

type Props = {
  active: 'baby' | 'mom';
  onChange: (value: 'baby' | 'mom') => void;
};

export default function Tabs({ active, onChange }: Props) {
  const startX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;

    const diff = e.clientX - startX.current;

    if (Math.abs(diff) > 40) {
      if (diff < 0 && active === 'baby') onChange('mom');
      if (diff > 0 && active === 'mom') onChange('baby');
    }

    // 40 - поріг свайпу в пікселях, якщо користувач зсунов таб
    // мишею чи пальцем мінімум на 40 px, тоді жест вважається
    // свайпом і йде перемикання інформації на сторінці,
    // бо інакце це вважається випадковим рухом

    startX.current = null;
  };

  return (
    <div
      className={css.container_tab}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <span
        className={`${css.slider} ${
          active === 'mom' ? css.slider_mom : css.slider_baby
        }`}
        aria-hidden
      />

      <Button
        type="button"
        onClick={() => onChange('baby')}
        aria-pressed={active === 'baby'}
        className={css.button}
      >
        Розвиток малюка
      </Button>

      <Button
        type="button"
        onClick={() => onChange('mom')}
        aria-pressed={active === 'mom'}
        className={css.button}
      >
        Тіло мами
      </Button>

      {/* <Button
        type="button"
        onClick={() => onChange('baby')}
        aria-pressed={active === 'baby'}
        className={
          active === 'baby' ? css.button_active : css.button_non_active
        }
      >
        Розвиток малюка
      </Button>

      <Button
        type="button"
        onClick={() => onChange('mom')}
        aria-pressed={active === 'mom'}
        className={active === 'mom' ? css.button_active : css.button_non_active}
      >
        Тіло мами
      </Button> */}
    </div>
  );
}
