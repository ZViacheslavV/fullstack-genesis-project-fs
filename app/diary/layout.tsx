// app/diary/layout.tsx

import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import GreetingBlock from '@/components/diary/GreetingBlock/GreetingBlock';
import styles from './layout.module.css';

type DiaryLayoutProps = {
  children: React.ReactNode;
};

export default function DiaryLayout({ children }: DiaryLayoutProps) {
  return (
    <div className={styles.container}>
      {/* Ліва колонка — список */}
      <aside className={styles.list}>
        <GreetingBlock userName="Ганна" />
        <DiaryList />
      </aside>

      {/* Права колонка — деталі */}
      <section className={styles.details}>{children}</section>
    </div>
  );
}
