// components/diary/DiaryEntryDetails/DiaryEntryDetails.tsx

type DiaryEntryDetailsProps = {
  title?: string;
  date?: string;
  text?: string;
};

export default function DiaryEntryDetails({ title, date, text }: DiaryEntryDetailsProps) {
  // Поки що немає записів
  if (!title) {
    return (
      <section>
        <p>Наразі записи у щоденнику відстні</p>
      </section>
    );
  }

  return (
    <section>
      <h2>{title}</h2>
      <p>{date}</p>

      <p>{text}</p>

      <div>
        <button type="button">Редагувати</button>
        <button type="button">Видалити</button>
      </div>
    </section>
  );
}
