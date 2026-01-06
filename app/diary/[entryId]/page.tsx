// app/diary/[entryId]/page.tsx

import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';

type DiaryEntryPageProps = {
  params: {
    entryId: string;
  };
};

export default function DiaryEntryPage({ params }: DiaryEntryPageProps) {
  const { entryId } = params;

  // Тимчасово: дані-заглушка
  return (
    <main>
      <DiaryEntryDetails
        title={`Запис ${entryId}`}
        date="01.01.2024"
        text="Тут буде повний текст запису щоденника."
      />
    </main>
  );
}
