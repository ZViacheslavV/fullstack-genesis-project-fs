'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Tabs.module.css';

type Props = {
  weekNumber: number;
};

export default function Tabs({ weekNumber }: Props) {
  const pathname = usePathname();

  const tabs = [
    {
      href: `/journey/${weekNumber}/baby`,
      label: 'Розвиток малюка',
    },
    {
      href: `/journey/${weekNumber}/momy`,
      label: 'Тіло мами',
    },
  ];

  return (
    <div className={css.container_tab}>
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={pathname === tab.href ? 'page' : undefined}
        >
          <button
            type="button"
            className={css.button} // styles button ????
          >
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}

// or... ???
{
  /* <Link
  key={tab.href}
  href={tab.href}
  aria-current={pathname === tab.href ? 'page' : undefined}
  className={css.button}
>
  {tab.label}
</Link>; */
}
