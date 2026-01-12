'use client';

import css from './Toast.module.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
}

function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${css.toast} ${type === 'success' ? css.success : css.error}`}
    >
      <span className={css.dot} />
      <p className={css.message}>{message}</p>
    </div>
  );
}

export default Toast;
