import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullscreen = false }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64',
  };

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-50">
        <div className={sizeClasses[size]}>
          <Player
            autoplay
            loop
            src="/public/loader.json"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} mx-auto`}>
      <Player
        autoplay
        loop
        src="/public/loader.json"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Loader;
