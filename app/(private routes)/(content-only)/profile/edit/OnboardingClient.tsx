'use client';

import type { User } from '@/types/user';
import toast from 'react-hot-toast';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';
import Toast from '@/components/common/Toast/Toast';

interface Props {
  user: User;
}

export default function OnboardingClient({ user }: Props) {
  const handleSuccess = () => {
    toast.custom(
      <Toast type="success" message="Профіль успішно оновлено" />,
      { duration: 4000 }
    );
  };

  const handleError = () => {
    toast.custom(
      <Toast type="error" message="Сталася помилка" />,
      { duration: 5000 }
    );
  };

  return (
    <>
      <AvatarPicker
        profilePhotoUrl={user.photo}
        layout="vertical"
        buttonVariant="onboarding"
      />

      <OnboardingForm
        initialData={user}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </>
  );
}
