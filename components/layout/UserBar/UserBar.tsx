'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
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
    router.replace('/');
    setIsModalOpen(false);
  } catch {
    toast.error('Logout error');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className={css.userBar}>
      <div className={css.userInfo}>
        <Image
          className={css.avatar}
          src={user?.photo || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
          alt="User avatar"
          width={40}
          height={40}
        />

        <div>
          <p className={css.name}>{user?.name}</p>
          <p className={css.email}>{user?.email}</p>
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
    </section>
  );
}

export default UserBar;