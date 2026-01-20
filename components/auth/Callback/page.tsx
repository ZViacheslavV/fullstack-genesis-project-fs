'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import LoaderBaby from '@/components/common/Loader/LoaderBaby';

export default function GoogleAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const success = await checkSession();

        if (success) {
          router.replace('/');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Google auth callback error', error);
        router.replace('/auth/login');
      }
    };

    initAuth();
  }, [router]);

  return <LoaderBaby />;
}
