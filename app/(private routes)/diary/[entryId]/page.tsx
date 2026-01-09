// // app/(private routes)/diary/[entryId]/page.tsx

// import GreetingBlock from '@/components/diary/GreetingBlock/GreetingBlock';
// import DiaryList from '@/components/diary/DiaryList/DiaryList';
// import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';

// import css from './page.module.css';

// type Props = {
//   params: {
//     entryId: string;
//   };
// };

// export default function DiaryEntryPage({ params }: Props) {
//   return (
//     <main style={{ padding: 16 }}>
//       <GreetingBlock />

//       <section className={css.container}>
//         <aside className={css.sidebar}>
//           <DiaryList />
//         </aside>

//         <section className={css.details}>
//           <DiaryEntryDetails diaryId={params.entryId} />
//         </section>
//       </section>
//     </main>
//   );
// }
