'use client';

import { useState } from 'react';
import Tabs from '../Tabs/Tabs';

type Props = {
  baby: React.ReactNode;
  mom: React.ReactNode;
};

export default function JourneyDetails({ baby, mom }: Props) {
  const [active, setActive] = useState<'baby' | 'mom'>('baby');

  return (
    <>
      <Tabs active={active} onChange={setActive} />
      {active === 'baby' ? baby : mom}
    </>
  );
}
