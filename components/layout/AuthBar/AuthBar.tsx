'use client';

import ButtonLink from '@/components/common/Button/ButtonLink';

import css from './AuthBar.module.css';

function AuthBar() {

  return (
    <nav aria-label="Auth navigation">
      <ul className={css.authList}>
        <li>
          <ButtonLink className={css.link} href="/auth/register" variant="normal" size="md">
            Зареєструватись
          </ButtonLink>
        </li>
        <li>
          <ButtonLink className={css.link} href="/auth/login" variant="cancel" size="md">
            Увійти
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
};

export default AuthBar;