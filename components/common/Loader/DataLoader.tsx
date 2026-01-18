'use client';

import Image from 'next/image';
import styles from './Baby.module.css';

export default function DataLoader() {
  return (
    <div className={styles.overlay} style={{ zIndex: 9999 }}>
      <div className={styles.loader}>
        <Image
          src="/Baby.gif"
          alt="Завантаження..."
          width={140}
          height={140}
          priority
        />
      </div>
    </div>
  );
}
