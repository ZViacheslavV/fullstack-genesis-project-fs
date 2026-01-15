'use client';

import Button from '@/components/common/Button/Button';
import css from './Tabs.module.css';

type Props = {
  active: 'baby' | 'mom';
  onChange: (value: 'baby' | 'mom') => void;
};

export default function Tabs({ active, onChange }: Props) {
  return (
    <div className={css.container_tab}>
      <Button
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
      </Button>
    </div>
  );
}
