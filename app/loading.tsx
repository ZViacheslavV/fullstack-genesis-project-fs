// 'use client';

import LoaderBaby from '@/components/common/Loader/LoaderBaby';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={`${styles.overlay} ${styles.fadeIn}`}>
      <LoaderBaby className={styles.player} />
    </div>
  );
}
