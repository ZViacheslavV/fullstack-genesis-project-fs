'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { User } from '../../../../types/user';
import { getMe } from '@/lib/api/clientApi';

import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';
import Toast from '@/components/common/Toast/Toast';
import css from '../../../(public routes)/auth/layout.module.css';

//===========================================================================

const OnboardingPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error('Data error:', error);

        toast.custom(
          <Toast type="error" message="Помилка отримання користувача" />,

          { duration: 5000 }
        );
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={css.page}>
      <div className={css.left}>
        <div className={css.logoRow}>
          <Link href="/">
            <Image
              src="/company-logo.svg"
              alt="Лелека"
              width={105}
              height={45}
              priority
            />
          </Link>
        </div>

        <div className={css.formWrap}>
          <h1 className={css.title}>Давайте познаймимось ближче</h1>
          <OnboardingForm initialData={user} />
        </div>
      </div>

      <div className={css.right} aria-hidden="true">
        <Image
          src={
            '/painting-of-a-tiny-delicate-sprout-emerging-from-the-ground-surrounded-by-a-soft-warm-magical-glow.jpg'
          }
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 40vw, 0px"
          className={css.illustration}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
