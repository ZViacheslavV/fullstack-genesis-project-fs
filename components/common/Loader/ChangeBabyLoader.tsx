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
//     // пропускаємо перше завантаження
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

//Другий варіант (на мій погляд ефективний)
// 'use client';

// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// let navigationStartTime = 0;

// export default function ChangeBabyLoader() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const pathname = usePathname();
//   const [prevPathname, setPrevPathname] = useState(pathname);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       const link = target.closest('a');

//       if (link?.getAttribute('href')?.startsWith('/')) {
//         navigationStartTime = Date.now();
//         setIsLoading(true);
//         setIsVisible(true);
//       }
//     };

//     document.addEventListener('click', handleClick);

//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, []);

//   useEffect(() => {
//     if (pathname !== prevPathname) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setPrevPathname(pathname);

//       if (isLoading) {
//         const checkPageLoad = () => {
//           if (document.readyState === 'complete') {
//             const elapsed = Date.now() - navigationStartTime;
//             const minShowTime = 2000;
//             const remainingTime = Math.max(minShowTime - elapsed, 100);

//             setTimeout(() => {
//               setIsVisible(false);
//               setTimeout(() => {
//                 setIsLoading(false);
//               }, 2000);
//             }, remainingTime);
//           } else {
//             setTimeout(checkPageLoad, 100);
//           }
//         };

//         checkPageLoad();
//       }
//     }
//   }, [pathname, prevPathname, isLoading]);

//   useEffect(() => {
//     if (isLoading) {
//       const timeoutId = setTimeout(() => {
//         setIsVisible(false);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000);
//       }, 3000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [isLoading]);

//   if (!isLoading) return null;

//   return (
//     <div
//       className={`${styles.overlay} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
//     >
//       <LoaderBaby className={styles.player} />
//     </div>
//   );
// }

//Третій варіант
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// const MIN_SHOW_TIME = 300;
// const FADE_DURATION = 300;
// const MAX_SHOW_TIME = 3000;

// export default function ChangeBabyLoader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const isFirstLoad = useRef(true);
//   const prevRouteRef = useRef<string>('');
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const startTimeRef = useRef<number>(0);

//   const [visible, setVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//
//     const currentRoute = `${pathname}?${searchParams.toString()}`;

//
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       prevRouteRef.current = currentRoute;
//       return;
//     }

//
//     if (currentRoute === prevRouteRef.current) {
//       return; // Не показуємо лоадер при оновленні тієї ж сторінки
//     }

//
//     prevRouteRef.current = currentRoute;

//
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setShouldRender(true);
//     setVisible(true);
//     startTimeRef.current = Date.now();

//
//     const hideLoader = () => {
//       setVisible(false);
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setShouldRender(false);
//       }, FADE_DURATION);
//     };

//
//     const checkIfPageLoaded = () => {
//
//       const isPageLoaded = document.readyState === 'complete';

//
//       const isNextReady =
//         typeof window !== 'undefined' &&
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (window as any).__NEXT_DATA__?.pageLoader?.isPageReady;

//       if (isPageLoaded || isNextReady) {
//         const elapsed = Date.now() - startTimeRef.current;
//         const remainingTime = Math.max(MIN_SHOW_TIME - elapsed, 0);

//
//         setTimeout(hideLoader, remainingTime);
//       } else {
//
//         setTimeout(checkIfPageLoaded, 50);
//       }
//     };

//
//     checkIfPageLoaded();

//
//     const fallbackTimer = setTimeout(hideLoader, MAX_SHOW_TIME);

//
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       clearTimeout(fallbackTimer);
//     };
//   }, [pathname, searchParams]);

//   if (!shouldRender) return null;

//   return (
//     <div
//       className={`${styles.overlay} ${
//         visible ? styles.fadeIn : styles.fadeOut
//       }`}
//       aria-live="polite"
//       aria-busy={visible}
//     >
//       <LoaderBaby className={styles.player} />
//     </div>
//   );
// }

//Четвертий варіант
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// const MIN_SHOW_TIME = 300;
// const FADE_DURATION = 300;

// export default function ChangeBabyLoader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const isFirstLoad = useRef(true);
//   const prevRouteRef = useRef<string>('');
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const startTimeRef = useRef<number>(0);

//   const [visible, setVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//     const currentRoute = `${pathname}?${searchParams.toString()}`;

//
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       prevRouteRef.current = currentRoute;
//       return;
//     }

//
//     if (currentRoute === prevRouteRef.current) {
//       return;
//     }

//     prevRouteRef.current = currentRoute;

//
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setShouldRender(true);
//     setVisible(true);
//     startTimeRef.current = Date.now();

//     const hideLoader = () => {
//       setVisible(false);
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setShouldRender(false);
//       }, FADE_DURATION);
//     };

//
//     const findAndObserveContent = () => {
//
//       const mainContent =
//         document.querySelector('main') ||
//         document.querySelector('[role="main"]') ||
//         document.querySelector('.content') ||
//         document.getElementById('__next');

//       if (mainContent && mainContent.childElementCount > 0) {
//         const elapsed = Date.now() - startTimeRef.current;
//         const remainingTime = Math.max(MIN_SHOW_TIME - elapsed, 0);

//
//         setTimeout(hideLoader, remainingTime);
//       } else {
//
//         setTimeout(findAndObserveContent, 100);
//       }
//     };

//
//     findAndObserveContent();

//
//     const fallbackTimer = setTimeout(hideLoader, 3000);

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       clearTimeout(fallbackTimer);
//       if (observerRef.current) {
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         observerRef.current.disconnect();
//       }
//     };
//   }, [pathname, searchParams]);

//   if (!shouldRender) return null;

//   return (
//     <div
//       className={`${styles.overlay} ${
//         visible ? styles.fadeIn : styles.fadeOut
//       }`}
//       aria-live="polite"
//       aria-busy={visible}
//     >
//       <LoaderBaby className={styles.player} />
//     </div>
//   );
// }

//П'ятий варіант
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// const FADE_DURATION = 300;

// export default function ChangeBabyLoader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const isFirstLoad = useRef(true);
//   const prevRouteRef = useRef<string>('');

//   const [visible, setVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//
//     const currentRoute = `${pathname}?${searchParams.toString()}`;

//
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       prevRouteRef.current = currentRoute;
//       return;
//     }

//
//     if (currentRoute === prevRouteRef.current) {
//       return; // Не показуємо лоадер при оновленні тієї ж сторінки
//     }

//
//     prevRouteRef.current = currentRoute;

//     setShouldRender(true);
//     setVisible(true);

//
//     const showTime = 400; // Час, за який Next.js зазвичай рендерить нову сторінку

//     const hideTimer = setTimeout(() => {
//       setVisible(false);
//     }, showTime);

//     const unmountTimer = setTimeout(() => {
//       setShouldRender(false);
//     }, showTime + FADE_DURATION);

//     return () => {
//       clearTimeout(hideTimer);
//       clearTimeout(unmountTimer);
//     };
//   }, [pathname, searchParams]);

//   if (!shouldRender) return null;

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

//Шостий (непоганий)
// 'use client';

// import { useEffect, useRef, useState, useTransition } from 'react';
// import { usePathname } from 'next/navigation';
// import LoaderBaby from './LoaderBaby';
// import styles from './ChangeBabyLoader.module.css';

// const FADE_DURATION = 300;
// const MIN_SHOW_TIME = 400;

// export default function ChangeBabyLoader() {
//   const pathname = usePathname();
//   const [, startTransition] = useTransition(); // Використовуємо тільки для активації

//   const isFirstLoad = useRef(true);
//   const isLoading = useRef(false);
//   const [visible, setVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);

//
//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       return;
//     }

//
//     if (shouldRender) {
//       const startTime = Date.now();

//       const hideLoader = () => {
//         setVisible(false);
//         setTimeout(() => {
//           setShouldRender(false);
//           isLoading.current = false;
//         }, FADE_DURATION);
//       };

//
//       const checkIfLoaded = () => {
//         if (document.readyState === 'complete') {
//           const elapsed = Date.now() - startTime;
//           const remainingTime = Math.max(MIN_SHOW_TIME - elapsed, 0);
//           setTimeout(hideLoader, remainingTime);
//         } else {
//           setTimeout(checkIfLoaded, 100);
//         }
//       };

//       checkIfLoaded();

//
//       const fallback = setTimeout(hideLoader, 3000);

//       return () => {
//         clearTimeout(fallback);
//       };
//     }
//   }, [pathname, shouldRender]);

//
//   useEffect(() => {
//
//     const checkNavigation = () => {
//       startTransition(() => {
//
//       });
//     };

//
//     const interval = setInterval(checkNavigation, 100);

//     return () => clearInterval(interval);
//   }, [startTransition]);

//
//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       const link = target.closest('a');

//       if (link) {
//         const href = link.getAttribute('href');
//         const isExternal =
//           link.getAttribute('target') === '_blank' ||
//           link.getAttribute('rel')?.includes('external');

//
//         if (href && href.startsWith('/') && !isExternal && href !== pathname) {
//
//           if (!isLoading.current) {
//             isLoading.current = true;
//             setShouldRender(true);
//             setVisible(true);
//           }
//         }
//       }
//     };

//     document.addEventListener('click', handleClick);
//     return () => document.removeEventListener('click', handleClick);
//   }, [pathname]);

//   if (!shouldRender) return null;

//   return (
//     <div
//       className={`${styles.overlay} ${
//         visible ? styles.fadeIn : styles.fadeOut
//       }`}
//       aria-live="polite"
//       aria-busy="true"
//     >
//       <LoaderBaby className={styles.player} />
//     </div>
//   );
// }

//Сьомий
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoaderBaby from './LoaderBaby';
import styles from './ChangeBabyLoader.module.css';

const FADE_DURATION = 0;

export default function ChangeBabyLoader() {
  const pathname = usePathname();

  const isFirstLoad = useRef(true);
  const isLoading = useRef(false);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (!isLoading.current) {
      isLoading.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      setVisible(true);
    }

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, /* 40 */ 0);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      isLoading.current = false;
    }, /* 40 */ 0 + FADE_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');

        if (href && href.startsWith('/') && href !== pathname) {
          if (!isLoading.current) {
            isLoading.current = true;
            setShouldRender(true);
            setVisible(true);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${
        visible ? styles.fadeIn : styles.fadeOut
      }`}
    >
      <LoaderBaby className={styles.player} />
    </div>
  );
}
