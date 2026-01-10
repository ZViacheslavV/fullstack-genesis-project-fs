'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from './Sidebar.module.css';
import { useAuthUserStore } from '@/lib/store/authStore';

import AuthBar from '@/components/layout/AuthBar/AuthBar';
import UserBar from '@/components/layout/UserBar/UserBar';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}
function SideBar() {
  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  /*   const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/'; */ //!Changed this

  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname); //TODO need check
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Кнопка бургера для перевірки */}
      {/* <button
        type="button"
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
        onClick={() => setIsOpen(true)}
      >
        <svg width="28" height="28" aria-hidden>
          <use href="/icons.svg#icon-burger" />
        </svg>
      </button> */}

      <div
        className={`${css.backdrop} ${isOpen ? css.backdropOpen : ''}`}
        onClick={closeMenu}
      />

      <aside className={`${css.root} ${isOpen ? css.open : ''}`}>
        <div className={css.top}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/company-logo.svg"
              alt="Logo"
              className={css.logoImg}
              width={105}
              height={45}
            />
          </Link>

          <button type="button" className={css.close} onClick={closeMenu}>
            <svg width="32" height="32">
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>
        </div>

        <nav className={css.nav}>
          <Link
            href={/* isAuthenticated ?  */ '/' /*:  '/auth/login' */}
            className={`${css.navItem} ${
              isActive(pathname, '/') ? css.active : ''
            }`}
            onClick={closeMenu}
          >
            <svg className={css.icon} width="20" height="20">
              <use href="/icons.svg#icon-today" />
            </svg>
            <span>Мій день</span>
          </Link>

          <Link
            href={isAuthenticated ? '/journey/1' : '/auth/login'} // TODO: weekNumber
            className={`${css.navItem} ${
              isActive(pathname, '/journey') ? css.active : ''
            }`}
            onClick={closeMenu}
          >
            <svg className={css.icon} width="20" height="20">
              <use href="/icons.svg#icon-conversion-path" />
            </svg>
            <span>Подорож</span>
          </Link>

          <Link
            href={isAuthenticated ? '/diary' : '/auth/login'}
            className={`${css.navItem} ${
              isActive(pathname, '/diary') ? css.active : ''
            }`}
            onClick={closeMenu}
          >
            <svg className={css.icon} width="20" height="20">
              <use href="/icons.svg#icon-book" />
            </svg>
            <span>Щоденник</span>
          </Link>

          <Link
            href={isAuthenticated ? '/profile' : '/auth/login'}
            className={`${css.navItem} ${
              isActive(pathname, '/profile') ? css.active : ''
            }`}
            onClick={closeMenu}
          >
            <svg className={css.icon} width="20" height="20">
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
