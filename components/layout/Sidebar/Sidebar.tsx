'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { useAuthUserStore } from '@/lib/store/authStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';

import AuthBar from '@/components/layout/AuthBar/AuthBar';
import UserBar from '@/components/layout/UserBar/UserBar';

import css from './Sidebar.module.css';
import { useWeekStore } from '@/lib/store/weekStore';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);
  const weekNumber = useWeekStore((s) => s.weekNumb);

  const isOpen = useSidebarStore((s) => s.isOpen);
  const close = useSidebarStore((s) => s.close);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close]);

  const isAuthRoute = pathname.startsWith('/auth');
  if (isAuthRoute) return null;

  const handleProtectedNavClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/auth/login');
      close();
      return;
    }

    close();
  };

  return (
    <>
      <div
        className={`${css.backdrop} ${isOpen ? css.backdropOpen : ''}`}
        onClick={close}
        aria-hidden
      />

      <aside className={`${css.root} ${isOpen ? css.open : ''}`}>
        <div className={css.top}>
          <Link className={css.logoLink} href="/" onClick={close}>
            <Image
              src="/company-logo.svg"
              alt="Logo"
              className={css.logoImg}
              width={105}
              height={45}
              priority
            />
          </Link>

          <button
            type="button"
            className={css.close}
            onClick={close}
            aria-label="Close menu"
          >
            <svg width="32" height="32" aria-hidden>
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>
        </div>

        <nav className={css.nav}>
          <Link
            href="/"
            className={`${css.navItem} ${isActive(pathname, '/') ? css.active : ''}`}
            onClick={handleProtectedNavClick}
          >
            <svg width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-today" />
            </svg>
            <span>Мій день</span>
          </Link>

          <Link
            href={`/journey/${weekNumber}`}
            className={`${css.navItem} ${
              isActive(pathname, '/journey') ? css.active : ''
            }`}
            onClick={handleProtectedNavClick}
          >
            <svg width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-conversion-path" />
            </svg>
            <span>Подорож</span>
          </Link>

          <Link
            href="/diary"
            className={`${css.navItem} ${isActive(pathname, '/diary') ? css.active : ''}`}
            onClick={handleProtectedNavClick}
          >
            <svg width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-book" />
            </svg>
            <span>Щоденник</span>
          </Link>

          <Link
            href="/profile"
            className={`${css.navItem} ${
              isActive(pathname, '/profile') ? css.active : ''
            }`}
            onClick={handleProtectedNavClick}
          >
            <svg width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-account-circle" />
            </svg>
            <span>Профіль</span>
          </Link>
        </nav>

        <div className={css.divider} />

        <div className={css.bottom}>
          {isAuthenticated ? <UserBar /> : <AuthBar />}
        </div>
      </aside>
    </>
  );
}

export default SideBar;
