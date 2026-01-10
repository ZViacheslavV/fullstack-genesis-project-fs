'use client';

import { useState } from 'react';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/diary/DiaryList/DiaryList';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import styles from './page.module.css';

const DiaryPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className={styles.page}>
      <GreetingBlock />

      <div className={styles.content}>
        <DiaryList onAddEntry={() => setIsAddOpen(true)} />
      </div>

      <AddDiaryEntryModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};

export default DiaryPage;
