'use client';

import css from './Feelings.module.css';

export type Feelings = {
  states: string[];
  sensationDescr: string;
};

export type FeelingsProps = {
  feelings: Feelings;
};

function Feelings({ feelings }: FeelingsProps) {
  return (
    <div className={css.container_feel}>
      <h2 className={css.title}>Як ви можете почуватись</h2>
      <ul className={css.list}>
        {feelings.states.map((item, index) => (
          <li key={index} className={css.item}>
            {item}
          </li>
        ))}
      </ul>
      <p className={css.text}>{feelings.sensationDescr}</p>
    </div>
  );
}

export default Feelings;
