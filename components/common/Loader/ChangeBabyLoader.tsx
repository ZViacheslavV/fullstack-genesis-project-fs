// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// const FADE_DURATION = 500;
// const MIN_SHOW_TIME = 2000;

// export default function ChangeBabyLoader() {
//   const pathname = usePathname();
//   const isFirstLoad = useRef(true);

//   const [visible, setVisible] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // пропускаємо перше завантаження (там InitialLoader / Stork)
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       return;
//     }

//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setMounted(true);
//     setVisible(true);

//     const hideTimer = setTimeout(() => {
//       setVisible(false);
//     }, MIN_SHOW_TIME);

//     const unmountTimer = setTimeout(() => {
//       setMounted(false);
//     }, MIN_SHOW_TIME + FADE_DURATION);

//     return () => {
//       clearTimeout(hideTimer);
//       clearTimeout(unmountTimer);
//     };
//   }, [pathname]);

//   if (!mounted) return null;

//   return (
//     <div
//       className={`${styles.overlay} ${
//         visible ? styles.fadeIn : styles.fadeOut
//       }`}
//     >
//       <LoaderBaby className={styles.player} />
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoaderBaby from './LoaderBaby';
import styles from './ChangeBabyLoader.module.css';

let navigationStartTime = 0;

export default function ChangeBabyLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link?.getAttribute('href')?.startsWith('/')) {
        navigationStartTime = Date.now();
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrevPathname(pathname);

      if (isLoading) {
        const checkPageLoad = () => {
          if (document.readyState === 'complete') {
            const elapsed = Date.now() - navigationStartTime;
            const minShowTime = 2000;
            const remainingTime = Math.max(minShowTime - elapsed, 100);

            setTimeout(() => {
              setIsLoading(false);
            }, remainingTime);
          } else {
            setTimeout(checkPageLoad, 100);
          }
        };

        checkPageLoad();
      }
    }
  }, [pathname, prevPathname, isLoading]);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <LoaderBaby className={styles.player} />
    </div>
  );
}

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// let lastPathname = '';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// let navigationStartTime = 0;

// export default function ChangeBabyLoader() {
//   const [isLoading, setIsLoading] = useState(false);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const prevPathnameRef = useRef(pathname);
//   const prevSearchParamsRef = useRef(searchParams.toString());
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Функція для перевірки, чи це динамічний маршрут
//   const isDynamicRouteChange = (oldPath: string, newPath: string) => {
//     // Перевіряємо, чи це той самий шаблон маршруту з різними параметрами
//     const oldParts = oldPath.split('/').filter(Boolean);
//     const newParts = newPath.split('/').filter(Boolean);

//     if (oldParts.length !== newParts.length) return false;

//     // Перевіряємо, чи відрізняється тільки остання частина (параметр)
//     for (let i = 0; i < oldParts.length - 1; i++) {
//       if (oldParts[i] !== newParts[i]) return false;
//     }

//     // Останні частини відрізняються - це динамічний маршрут
//     return oldParts[oldParts.length - 1] !== newParts[newParts.length - 1];
//   };

//   useEffect(() => {
//     const currentPath =
//       pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
//     const prevPath =
//       prevPathnameRef.current +
//       (prevSearchParamsRef.current ? `?${prevSearchParamsRef.current}` : '');

//     // Перевіряємо, чи відбулася зміна маршруту
//     if (currentPath !== prevPath) {
//       console.log('Route changed:', { from: prevPath, to: currentPath });

//       const isDynamic = isDynamicRouteChange(prevPathnameRef.current, pathname);
//       console.log('Is dynamic route change:', isDynamic);

//       // Запускаємо лоадер для БУДЬ-ЯКОЇ зміни маршруту
//       if (!isLoading) {
//         // eslint-disable-next-line react-hooks/set-state-in-effect
//         setIsLoading(true);
//         navigationStartTime = Date.now();
//         lastPathname = pathname;
//       }

//       // Оновлюємо референси
//       prevPathnameRef.current = pathname;
//       prevSearchParamsRef.current = searchParams.toString();

//       // Ховаємо лоадер
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);

//       // Для динамічних маршрутів - коротший час показу
//       const minShowTime = isDynamic ? 400 : 700;

//       timeoutRef.current = setTimeout(() => {
//         setIsLoading(false);
//       }, minShowTime);
//     }
//   }, [pathname, searchParams, isLoading]);

//   // Додатковий захист: примусово ховаємо через 3 секунди
//   useEffect(() => {
//     if (isLoading) {
//       const safetyTimeout = setTimeout(() => {
//         console.warn('Loader safety timeout triggered');
//         setIsLoading(false);
//       }, 3000);

//       return () => clearTimeout(safetyTimeout);
//     }
//   }, [isLoading]);

//   if (!isLoading) return null;

//   return (
//     <div className={styles.overlay}>
//       <LoaderBaby />
//     </div>
//   );
// }
