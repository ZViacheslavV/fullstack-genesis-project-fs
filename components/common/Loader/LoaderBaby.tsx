'use client';

import dynamic from 'next/dynamic';
import styles from './LoaderBaby.module.css';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(({ Player }) => Player),
  { ssr: false }
);

interface LoaderBabyProps {
  className?: string;
}

export default function LoaderBaby({ className = '' }: LoaderBabyProps) {
  return (
    <div className={`${styles.player} ${className}`}>
      <Player
        autoplay
        loop
        src="/loader.json"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
