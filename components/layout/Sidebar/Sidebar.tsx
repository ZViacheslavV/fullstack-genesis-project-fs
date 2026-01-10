// 'use client';

// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import css from './Sidebar.module.css';
// import { useAuthUserStore } from '@/lib/store/authStore';

// import AuthBar from '@/components/layout/AuthBar/AuthBar';
// import UserBar from '@/components/layout/UserBar/UserBar';

// function isActive(pathname: string, href: string) {
//   if (href === '/') return pathname === '/';
//   return pathname === href || pathname.startsWith(href + '/');
// }
// function SideBar() {
//   const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);
//   const [isOpen, setIsOpen] = useState(false);
  
//   const pathname = usePathname();

//   const isAuthRoute = pathname.startsWith('/auth');
//   if (isAuthRoute) return null;

//   const closeMenu = () => setIsOpen(false);

//   return (
//     <>
//       {/* Кнопка бургера для перевірки */}
//       <button
//         type="button"
//         style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
//         onClick={() => setIsOpen(true)}
//       >
//         <svg width="28" height="28" aria-hidden>
//           <use href="/icons.svg#icon-burger" />
//         </svg>
//       </button>

//       <div
//         className={`${css.backdrop} ${isOpen ? css.backdropOpen : ''}`}
//         onClick={closeMenu}
//       />

//       <aside className={`${css.root} ${isOpen ? css.open : ''}`}>
//         <div className={css.top}>
//           <Link href="/" onClick={closeMenu}>
//             <Image
//               src="/company-logo.svg"
//               alt="Logo"
//               className={css.logoImg}
//               width={105}
//               height={45}
//             />
//           </Link>

//           <button type="button" className={css.close} onClick={closeMenu}>
//             <svg width="32" height="32">
//               <use href="/icons.svg#icon-close" />
//             </svg>
//           </button>
//         </div>

//         <nav className={css.nav}>
//           <Link
//             href={isAuthenticated ? '/' : '/auth/login'}
//             className={`${css.navItem} ${
//               isActive(pathname, '/') ? css.active : ''
//             }`}
//             onClick={closeMenu}
//           >
//             <svg className={css.icon} width="20" height="20">
//               <use href="/icons.svg#icon-today" />
//             </svg>
//             <span>Мій день</span>
//           </Link>

//           <Link
//             href={isAuthenticated ? '/journey/1' : '/auth/login'} // TODO: weekNumber
//             className={`${css.navItem} ${
//               isActive(pathname, '/journey') ? css.active : ''
//             }`}
//             onClick={closeMenu}
//           >
//             <svg className={css.icon} width="20" height="20">
//               <use href="/icons.svg#icon-conversion-path" />
//             </svg>
//             <span>Подорож</span>
//           </Link>

//           <Link
//             href={isAuthenticated ? '/diary' : '/auth/login'}
//             className={`${css.navItem} ${
//               isActive(pathname, '/diary') ? css.active : ''
//             }`}
//             onClick={closeMenu}
//           >
//             <svg className={css.icon} width="20" height="20">
//               <use href="/icons.svg#icon-book" />
//             </svg>
//             <span>Щоденник</span>
//           </Link>

//           <Link
//             href={isAuthenticated ? '/profile' : '/auth/login'}
//             className={`${css.navItem} ${
//               isActive(pathname, '/profile') ? css.active : ''
//             }`}
//             onClick={closeMenu}
//           >
//             <svg className={css.icon} width="20" height="20">
//               <use href="/icons.svg#icon-account-circle" />
//             </svg>
//             <span>Профіль</span>
//           </Link>
//         </nav>

//         <div className={css.divider} />

//         <div className={css.bottom}>
//           {isAuthenticated ? <UserBar /> : <AuthBar />}
//         </div>
//       </aside>
//     </>
//   );
// }

// export default SideBar;

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import css from './Sidebar.module.css';
import { useAuthUserStore } from '@/lib/store/authStore';

import AuthBar from '@/components/layout/AuthBar/AuthBar';
import UserBar from '@/components/layout/UserBar/UserBar';

const JOURNEY_DEFAULT_HREF = '/journey/1';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const isAuthRoute = pathname.startsWith('/auth');
  if (isAuthRoute) return null;

  const handleProtectedNavClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/auth/login');
      closeMenu();
      return;
    }

    closeMenu();
  };

  return (
    <>
      {/* TEMP burger button for testing (remove when Header is ready) */}
      {/* <button
        type="button"
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <svg width="28" height="28" aria-hidden>
          <use href="/icons.svg#icon-burger" />
        </svg>
      </button> */}

      <div
        className={`${css.backdrop} ${isOpen ? css.backdropOpen : ''}`}
        onClick={closeMenu}
        aria-hidden
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
              priority
            />
          </Link>

          <button
            type="button"
            className={css.close}
            onClick={closeMenu}
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
            className={`${css.navItem} ${
              isActive(pathname, '/') ? css.active : ''
            }`}
            onClick={handleProtectedNavClick}
          >
            <svg className={css.icon} width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-today" />
            </svg>
            <span>Мій день</span>
          </Link>

          <Link
            href={JOURNEY_DEFAULT_HREF}
            className={`${css.navItem} ${
              isActive(pathname, '/journey') ? css.active : ''
            }`}
            onClick={handleProtectedNavClick}
          >
            <svg className={css.icon} width="20" height="20" aria-hidden>
              <use href="/icons.svg#icon-conversion-path" />
            </svg>
            <span>Подорож</span>
          </Link>

          <Link
            href="/diary"
            className={`${css.navItem} ${
              isActive(pathname, '/diary') ? css.active : ''
            }`}
            onClick={handleProtectedNavClick}
          >
            <svg className={css.icon} width="20" height="20" aria-hidden>
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
            <svg className={css.icon} width="20" height="20" aria-hidden>
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
