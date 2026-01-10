'use client';

import css from './Header.module.css';

import { useSidebarStore } from '@/lib/store/sidebarStore';
import { usePathname } from 'next/navigation';

//===========================================================================

function Header() {
  const pathname = usePathname();
  const toggle = useSidebarStore((s) => s.toggle);

  const isAuthRoute = pathname.startsWith('/auth');
  return <header className={css.header}>

<div
      >
       {!isAuthRoute && (
          <button type="button" onClick={toggle} aria-label="Open menu">
            <svg width="32" height="32" aria-hidden>
              <use href="/icons.svg#icon-burger" />
            </svg>
          </button>
        )}

      </div>

  </header>;
}

export default Header;