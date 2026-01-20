'use client';

import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import DiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import css from './FeelingCheckCard.module.css';
import { useRouter } from 'next/navigation';
import { useAuthUserStore } from '@/lib/store/authStore';

type FeelRecommendationCardProps = {
  recommendationText: string | undefined;
  className?: string;

  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function FeelRecommendationCard({
  recommendationText,
  className = '',
  mode = 'create',
  initialValues,
}: FeelRecommendationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = useAuthUserStore((s) => s.isAuthenticated);
  const router = useRouter();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <section className={`${css.card} ${className}`}>
        <div className={css.content}>
          <h2 className={css.title}>Як ви себе почуваєте?</h2>

          <div className={css.text}>
            <p className={css.lead}>Рекомендація на сьогодні:</p>

            <p className={css.desc}>{recommendationText}</p>
          </div>

          <Button
            className={css.btn}
            onClick={() =>
              isAuthenticated ? openModal() : router.push('/auth/register')
            }
          >
            Зробити запис у щоденник
          </Button>
        </div>

        {/* <div className={css.side} aria-hidden="true" /> */}
      </section>

      <DiaryEntryModal
        isOpen={isOpen}
        onClose={closeModal}
        mode={mode}
        initialValues={initialValues}
      />
    </>
  );
}

export default FeelRecommendationCard;
