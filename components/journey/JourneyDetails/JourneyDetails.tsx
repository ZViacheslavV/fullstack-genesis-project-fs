'use client';

import css from './JourneyDetails.module.css';
import BabyJourney from '../BabyJourney/BabyJourney';
import MomyJourney from '../MomyJourney/MomyJourney';
import Tabs from '../Tabs/Tabs';
import { useState } from 'react';

//===========================================================================

type Props = {
  weekNumber: number;
};

function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');

  return (
    <>
      <div className={css.picker}>
        <div>
          <Tabs active={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 'baby' && <BabyJourney weekNumber={weekNumber} />}
        {activeTab === 'mom' && <MomyJourney weekNumber={weekNumber} />}
      </div>
    </>
  );
}

export default JourneyDetails;
