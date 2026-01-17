'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Breadcrumbs.module.css';

const LABELS: Record<string, string> = {
  dashboard: 'Мій день',
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
};

function ArrowIcon() {
  return (
    <span className={css.arrow}>
      <svg width="24" height="24" aria-hidden className={css.icon}>
        <use href="/icons.svg#icon-keyboard-arrow" />
      </svg>
    </span>
  );
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname.startsWith('/auth')) return null;

  const rawSegments =
    pathname === '/' ? ['dashboard'] : pathname.split('/').filter(Boolean);

  const segments = rawSegments.filter(
    (segment) => Object.prototype.hasOwnProperty.call(LABELS, segment)
  );

  const isDashboardRoot =
    segments.length === 1 && segments[0] === 'dashboard';

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      <span className={css.item}>
        <Link href="/" className={css.link}>
          Лелека
        </Link>
        <ArrowIcon />
      </span>

      {isDashboardRoot ? (
        <span className={css.item}>
          <span className={css.current}>Мій день</span>
        </span>
      ) : (
        segments.map((segment, index) => {
          const href =
            segment === 'dashboard'
              ? '/'
              : '/' + segment;

          const label = LABELS[segment];
          const isLast = index === segments.length - 1;

          return (
            <span key={segment} className={css.item}>
              {isLast ? (
                <span className={css.current}>{label}</span>
              ) : (
                <>
                  <Link href={href} className={css.link}>
                    {label}
                  </Link>
                  <ArrowIcon />
                </>
              )}
            </span>
          );
        })
      )}
    </nav>
  );
}
