'use client';

import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';

function AuthBar() {
  const router = useRouter();

  return (
    <>
      <Button
        variant="normal"
        size="md"
        onClick={() => router.push('/auth/register')}
      >
        Зареєструватись
      </Button>

      <Button
        variant="cancel"
        size="md"
        onClick={() => router.push('/auth/login')}
      >
        Увійти
      </Button>
    </>
  );
};

export default AuthBar;