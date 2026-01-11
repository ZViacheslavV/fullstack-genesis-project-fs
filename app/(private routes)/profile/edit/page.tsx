"use client"
import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';
import Image from 'next/image';
import css from './page.module.css';
import { useState, useEffect } from 'react';
import { User } from '../../../../types/user';
import { getMe } from '@/lib/api/clientApi';


const OnboardingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error('Помилка отримання користувача', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  if (isLoading) {
    return <div>Завантаження...</div>;
  }
  return (
    <div className={css.fullPage}>
      <div className={css.left_side}>
        <div className={css.logo}>
          <Image src={'/company-logo.svg'} alt="alt" width={105} height={45} />
        </div>
        <div className={css.content}>
          <h1 className={css.title}>Давайте познаймимось ближче</h1>
          <OnboardingForm initialData={user} />
        </div>
      </div>
      <div className={css.right_side}>
        <Image
          src={
            '/painting-of-a-tiny-delicate-sprout-emerging-from-the-ground-surrounded-by-a-soft-warm-magical-glow.jpg'
          }
          alt="alt"
          width={720}
          height={900}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
