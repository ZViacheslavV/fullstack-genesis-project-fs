'use client';

import css from './JourneyDetails.module.css';
import BabyJourney from '../BabyJourney/BabyJourney';
import MomyJourney from '../MomyJourney/MomyJourney';
import Tabs from '../Tabs/Tabs';
import { useState } from 'react';

// ===========================================================================

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

        <BabyJourney weekNumber={weekNumber} />

        {activeTab === 'baby' && <BabyJourney weekNumber={weekNumber} />}
        {activeTab === 'mom' && <MomyJourney weekNumber={weekNumber} />}
      </div>
    </>
  );
}

export default JourneyDetails;

// ----------------------------------------------------------

// 'use client';

// import { useState } from 'react';
// import Tabs from '../Tabs/Tabs';

// type Props = {
//   baby: React.ReactNode;
//   mom: React.ReactNode;
// };

// export default function JourneyDetails({ baby, mom }: Props) {
//   const [active, setActive] = useState<'baby' | 'mom'>('baby');

//   return (
//     <>
//       <Tabs active={active} onChange={setActive} />
//       {active === 'baby' ? baby : mom}
//     </>
//   );
// }
