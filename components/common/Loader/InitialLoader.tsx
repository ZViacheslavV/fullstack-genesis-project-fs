'use client';

import { useEffect, useState } from 'react';
import LoaderStork from '@/components/common/Loader/LoaderStork';

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // показується тільки ОДИН раз після hydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderStork overlay size="medium" />;
  }

  return <>{children}</>;
}
