'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import { useAuthUserStore } from '@/lib/store/authStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';
import { useWeekStore } from '@/lib/store/weekStore';

import AuthBar from '@/components/layout/AuthBar/AuthBar';
import UserBar from '@/components/layout/UserBar/UserBar';

import css from './Sidebar.module.css';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function SideBar() {
  const pathname = usePathname();

  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);

  const weekNumberRaw = useWeekStore((s) => s.weekNumb);
  const weekNumber = Number.isFinite(weekNumberRaw) ? weekNumberRaw : 1;

  const isOpen = useSidebarStore((s) => s.isOpen);
  const close = useSidebarStore((s) => s.close);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1440) close();
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;

    if (window.innerWidth >= 1440) return;

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

  return (
    <>
      <div
        className={`${css.backdrop} ${isOpen ? css.backdropOpen : ''}`}
        onClick={close}
        aria-hidden="true"
        role="presentation"
      />

      <aside className={`${css.root} ${isOpen ? css.open : ''}`}>
        <h2 className="visually-hidden">Sidebar</h2>
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

        <nav aria-label="Main navigation" className={css.nav}>
          <ul className={css.navList}>
            <li>
              <Link
                href="/"
                className={`${css.navItem} ${isActive(pathname, '/') ? css.active : ''}`}
                onClick={close}
                aria-current={isActive(pathname, '/') ? 'page' : undefined}
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use href="/icons.svg#icon-today" />
                </svg>
                <span>Мій день</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/journey/${weekNumber}`}
                className={`${css.navItem} ${
                  isActive(pathname, '/journey') ? css.active : ''
                }`}
                onClick={close}
                aria-current={
                  isActive(pathname, '/journey') ? 'page' : undefined
                }
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use href="/icons.svg#icon-conversion-path" />
                </svg>
                <span>Подорож</span>
              </Link>
            </li>
            <li>
              <Link
                href="/diary"
                className={`${css.navItem} ${isActive(pathname, '/diary') ? css.active : ''}`}
                onClick={close}
                aria-current={isActive(pathname, '/diary') ? 'page' : undefined}
              >
                <svg width="20" height="20" aria-hidden>
                  <use href="/icons.svg#icon-book" />
                </svg>
                <span>Щоденник</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className={`${css.navItem} ${
                  isActive(pathname, '/profile') ? css.active : ''
                }`}
                onClick={close}
                aria-current={
                  isActive(pathname, '/profile') ? 'page' : undefined
                }
              >
                <svg width="20" height="20" aria-hidden>
                  <use href="/icons.svg#icon-account-circle" />
                </svg>
                <span>Профіль</span>
              </Link>
            </li>
          </ul>
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
