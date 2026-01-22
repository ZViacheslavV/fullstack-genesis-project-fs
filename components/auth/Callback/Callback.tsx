'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import LoaderStork from '@/components/common/Loader/LoaderStork';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const success = await checkSession();
        router.replace(success ? '/' : '/auth/login');
      } catch {
        router.replace('/auth/login');
      }
    };

    initAuth();
  }, [router]);

  return <LoaderStork />;
}
