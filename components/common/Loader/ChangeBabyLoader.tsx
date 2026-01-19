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
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link?.getAttribute('href')?.startsWith('/')) {
        navigationStartTime = Date.now();
        setIsLoading(true);
        setIsVisible(true);
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
              setIsVisible(false);
              setTimeout(() => {
                setIsLoading(false);
              }, 2000);
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
        setIsVisible(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
    >
      <LoaderBaby className={styles.player} />
    </div>
  );
}
