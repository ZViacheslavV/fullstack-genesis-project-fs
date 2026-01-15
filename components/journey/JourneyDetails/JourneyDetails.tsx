'use client';

import { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import css from './JourneyDetails.module.css';

type Props = {
  baby: React.ReactNode;
  mom: React.ReactNode;
};

export default function JourneyDetails({ baby, mom }: Props) {
  const [active, setActive] = useState<'baby' | 'mom'>('baby');

  return (
    <>
      <Tabs active={active} onChange={setActive} />
      <div className={css.wrapper}>
        <div
          className={`${css.panel} ${
            active === 'baby' ? css.active : css.left
          }`}
        >
          {baby}
        </div>

        <div
          className={`${css.panel} ${
            active === 'mom' ? css.active : css.right
          }`}
        >
          {mom}
        </div>
      </div>
    </>
  );
}
