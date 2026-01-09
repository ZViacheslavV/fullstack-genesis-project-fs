'use client';

import Link from 'next/link';

export default function DiaryList() {
  const diaries = [
    { id: '1', title: 'Запис 1' },
    { id: '2', title: 'Запис 2' },
    { id: '3', title: 'Запис 3' },
  ];

  return (
    <section>
      <h2>Щоденник</h2>

      <button type="button">Новий запис</button>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <Link href={`/diary?entryId=${diary.id}`}>{diary.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
