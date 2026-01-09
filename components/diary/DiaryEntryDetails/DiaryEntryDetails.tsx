type Props = {
  entryId: string | null;
};

export default function DiaryEntryDetails({ entryId }: Props) {
  if (!entryId) {
    return <p>Наразі записи у щоденнику відсутні</p>;
  }

  return (
    <section>
      <h2>Запис {entryId}</h2>
      <p>01.01.2024</p>
      <p>Тут буде повний текст запису щоденника.</p>

      <button>Редагувати</button>
      <button>Видалити</button>
    </section>
  );
}
