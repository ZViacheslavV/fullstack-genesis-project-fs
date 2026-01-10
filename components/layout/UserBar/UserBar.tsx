'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useAuthUserStore } from '@/lib/store/authStore';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';

import css from './UserBar.module.css';

function UserBar() {
  const router = useRouter();

  const user = useAuthUserStore((state) => state.user);
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      setIsLoading(true);

      await logout();

      clearIsAuthenticated();

      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // toast?
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <section className={css.userBar}>
      <div className={css.userInfo}>
        <Image
          className={css.avatar}
          src={user.photo as string}
          alt="User avatar"
          width={40}
          height={40}
        />

        <div>
          <p className={css.name}>{user.name}</p>
          <p className={css.email}>{user.email}</p>
        </div>
      </div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        aria-label="Logout"
      >
        <svg width="24" height="24">
          <use href="/icons.svg#icon-logout" />
        </svg>
      </button>

      {isModalOpen && (
        <ConfirmationModal
          isOpen={true}
          title="Ви впевнені, що хочете вийти?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}

export default UserBar;
