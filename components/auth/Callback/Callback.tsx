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
        let success = false;
        for (let i = 0; i < 3; i++) {
          success = await checkSession();
          if (success) break;

          await new Promise(res => setTimeout(res, 400));
        }

        router.replace(success ? '/' : '/auth/login');
      } catch {
        router.replace('/auth/login');
      }
    };

    initAuth();
  }, [router]);

  return <LoaderStork />;
}