'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

import { useSidebarStore } from '@/lib/store/sidebarStore';

function Header() {
  const pathname = usePathname();
  const toggle = useSidebarStore((s) => s.toggle);

  const isAuthRoute = pathname.startsWith('/auth');
  if (isAuthRoute) return null;

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Go to My Day">
        <Image
          src="/company-logo.svg"
          alt="Company logo"
          width={84}
          height={36}
          priority
        />
      </Link>

      <button
        type="button"
        onClick={toggle}
        aria-label="Open menu"
        className={css.burgerButton}
      >
        <svg width="32" height="32" aria-hidden>
          <use href="/icons.svg#icon-burger" />
        </svg>
      </button>
    </header>
  );
}

export default Header;
