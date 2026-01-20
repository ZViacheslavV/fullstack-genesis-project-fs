'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [diaryTitle, setDiaryTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const readTitle = () => {
      setDiaryTitle(document.body.dataset.diaryTitle);
    };

    readTitle();

    const observer = new MutationObserver(readTitle);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-diary-title'],
    });

    return () => observer.disconnect();
  }, []);

  if (pathname.startsWith('/auth')) return null;

  const segments =
    pathname === '/' ? ['dashboard'] : pathname.split('/').filter(Boolean);

  const isDashboardRoot = segments.length === 1 && segments[0] === 'dashboard';

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      {/* Root */}
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
          const isFirst = index === 0;
          const isLast = index === segments.length - 1;

          if (segments[0] === 'journey') {
            if (isFirst) {
              return (
                <span key="journey" className={css.item}>
                  <span className={css.current}>Подорож</span>
                </span>
              );
            }
            return null;
          }

          if (segments[0] === 'diary' && !LABELS[segment]) {
            if (isLast && diaryTitle) {
              return (
                <span key="diary-title" className={css.item}>
                  <span className={css.current}>{diaryTitle}</span>
                </span>
              );
            }
            return null;
          }

          const href = '/' + segments.slice(0, index + 1).join('/');
          const label = LABELS[segment];

          if (!label) return null;

          return (
            <span key={href} className={css.item}>
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
