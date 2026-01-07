'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

//===========================================================================

interface PublicLayoutProps {
  children: React.ReactNode;
}

//===========================================================================

function PublicLayout({ children }: PublicLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}

export default PublicLayout;
