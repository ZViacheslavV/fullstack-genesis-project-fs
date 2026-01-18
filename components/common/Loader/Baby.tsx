'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Baby.module.css';

const FADE_DURATION = 300;
const MIN_SHOW_TIME = 2000;

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
    }, MIN_SHOW_TIME);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, MIN_SHOW_TIME + FADE_DURATION);

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
      style={{ zIndex: 9998 }}
    >
      <div className={styles.loader}>
        <Image
          src="/Baby.gif"
          alt="Завантаження сторінки..."
          width={140}
          height={140}
          priority
        />
      </div>
    </div>
  );
}
