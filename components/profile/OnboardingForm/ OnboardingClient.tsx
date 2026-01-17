'use client';

import type { User } from '@/types/user';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import OnboardingForm from '@/components/profile/OnboardingForm/OnboardingForm';

interface Props {
  user: User;
}

export default function OnboardingClient({ user }: Props) {
  return (
    <>
      <AvatarPicker
        profilePhotoUrl={user.photo}
        layout="vertical"
        buttonVariant="onboarding"
      />

      <OnboardingForm initialData={user} />
    </>
  );
}
