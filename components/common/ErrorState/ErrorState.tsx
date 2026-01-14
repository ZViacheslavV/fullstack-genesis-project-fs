'use client';

import Button from '@/components/common/Button/Button';
import css from './ErrorState.module.css';

//===============================================================

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

//===============================================================

function ErrorState({
  title = 'Сталася помилка',
  description = 'Ми вже розбираємось. Спробуйте повторити дію.',
  onRetry,
}: Props) {
  return (
    <section>
      <div className={css.card}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.desc}>{description}</p>

        <div className={css.actions}>
          <Button onClick={onRetry}>Спробувати знову</Button>
        </div>
      </div>
    </section>
  );
}

export default ErrorState;
