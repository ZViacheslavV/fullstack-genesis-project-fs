'use client';

import css from './GoogleAuthButton.module.css';

type GoogleAuthButtonProps = {
  text: string;
};

const GoogleAuthButton = ({ text }: GoogleAuthButtonProps) => {
  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  return (
    <button
      type="button"
      className={css.googleButton}
      onClick={handleGoogleAuth}
    >
      <svg className={css.icon} width="24" height="24">
  <use href="/icons.svg#icon-google" />
</svg>
      <span className={css.text}>{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
