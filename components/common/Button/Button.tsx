import type { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';
import css from './Button.module.css';

type ButtonVariant = 'normal' | 'cancel' | 'delete' | 'logout';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: ReactNode;
}

/**
 * Кнопка (має відповідти макету Figma, якщо ні, скажіть мені, виправлю).
 *
 * Використання:
 * - За замовчуванням (md + normal):
 *   <Button>Зберегти</Button>
 *
 * - На всю ширину (форми):
 *   <Button className={css.fullWidth}>Продовжити</Button>
 *
 * - Маленькі (модалки «Так/Ні», «Зберегти/Відмінити»):
 *   <Button size="sm">Так</Button>
 *
 * - Вторинні / нейтральні (сірі):
 *   <Button variant="cancel">Відмінити</Button>
 *
 * - Небезпечна дія - видалення:
 *   <Button variant="delete">Видалити</Button>
 *
 * - Кнопка з іконкою зліва (Google 24×24):
 *   <Button variant="cancel" leftIcon={<GoogleIcon />}>Увійти через Google</Button>
 * 
 *  **** - Стан завантаження (кнопка тимчасово disabled + спінер):
 *   <Button
 *     isLoading={isCreating}
 *     loadingText="Створення…"
 *   >
 *     Створити
 *   </Button>
 */

function Button({
  variant = 'normal',
  type = 'button',
  size = 'md',
  className,
  children,
  leftIcon,
  loadingText,
  rightIcon,
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        css.button,
        css[variant],
        css[size],
        'anim-button',
        isLoading && css.loading,
        className
      )}
      {...rest}
    >
      {isLoading ? <span className={css.spinner} aria-hidden="true" /> : null}

      {!isLoading && leftIcon ? (
        <span className={css.leftIcon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      <span className={css.label}>
        {isLoading && loadingText ? loadingText : children}
      </span>

      {!isLoading && rightIcon ? (
        <span className={css.rightIcon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}

export default Button;

