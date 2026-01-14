'use client';

import ErrorState from '@/components/common/ErrorState/ErrorState';

//===========================================================================

type Props = {
  error: Error;
  reset: () => void;
};

//===========================================================================

function ProfileError({ reset }: Props) {
  return (
    <ErrorState
      title="Помилка при завантаженні"
      description="Щось пішло не так. Спробуйте, будь ласка, ще раз."
      onRetry={reset}
    />
  );
}

export default ProfileError;
