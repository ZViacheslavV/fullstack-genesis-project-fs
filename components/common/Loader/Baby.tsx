'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Baby.module.css';

const FADE_DURATION = 300;

export default function Baby() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // пропускаємо initial load (там Stork)
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldRender(true);
    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 500);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 500 + FADE_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${
        visible ? styles.fadeIn : styles.fadeOut
      }`}
    >
      <div className={styles.loader}>
        <Image
          src="/Baby.gif"
          alt="Loading..."
          width={140}
          height={140}
          priority
        />
      </div>
    </div>
  );
}

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import styles from './Baby.module.css';

// export default function Baby() {
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(false);
//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       return;
//     }

//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setLoading(true);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [pathname]);

//   if (!loading) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.loader}>
//         <Image
//           src="/Baby.gif"
//           alt="Loading..."
//           width={140}
//           height={140}
//           priority
//         />
//       </div>
//     </div>
//   );
// }
