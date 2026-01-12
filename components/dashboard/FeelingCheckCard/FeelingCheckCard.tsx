'use client';

import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import DiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import css from './FeelingCheckCard.module.css';

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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <section className={`${css.card} ${className}`}>
        <div className={css.content}>
          <h3 className={css.title}>Як ви себе почуваєте?</h3>

          <p className={css.text}>
            <span className={css.lead}>Рекомендація на сьогодні:</span>
            <br />
            <span className={css.desc}>{recommendationText}</span>
          </p>

          <Button className={css.btn} onClick={openModal}>
            Зробити запис у щоденник
          </Button>
        </div>

        <div className={css.side} aria-hidden="true" />
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
