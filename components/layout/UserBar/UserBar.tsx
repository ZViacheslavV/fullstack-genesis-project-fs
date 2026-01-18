'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Toast from '@/components/common/Toast/Toast';
import { logout } from '@/lib/api/clientApi';
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
    setIsLoading(true);

    try {
      await logout();
      clearIsAuthenticated();
      setIsModalOpen(false);
      router.replace('/');
    } catch {
      toast.custom(
        () => (
          <Toast
            type="error"
            message="Не вдалося вийти з акаунта. Спробуйте ще раз."
          />
        ),
        { duration: 5000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.userBar}>
      <div className={css.userInfo}>
        <Image
          className={css.avatar}
          src={
            user?.photo ||
            'https://ac.goit.global/fullstack/react/default-avatar.jpg'
          }
          alt="User avatar"
          width={40}
          height={40}
        />

        <div className={css.info}>
          <p className={css.name}>{user?.name}</p>
          <p className={css.email} title={user?.email}>
            {user?.email}
          </p>
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

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Ви точно хочете вийти?"
        confirmButtonText="Так"
        cancelButtonText="Ні"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UserBar;
