'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoaderStork from '@/components/common/Loader/LoaderStork';

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initAuth = async () => {
      const idToken = searchParams.get('token');

      if (!idToken) {
        router.replace('/auth/login');
        return;
      }

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
          {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          }
        );

        router.replace('/');
      } catch (error) {
        console.error('Google auth error:', error);
        router.replace('/auth/login');
      }
    };

    initAuth();
  }, [router, searchParams]);

  return <LoaderStork />;
}