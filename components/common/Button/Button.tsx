import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';
import css from './Button.module.css';

// ================================================================

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'normal' | 'cancel' | 'delete' | 'logout';
  text: string;
  type?: 'submit' | 'button';
}

// ================================================================

function Button({ variant = 'normal', text, type = 'button', className, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.button, css[variant], 'anim-button', className)}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
