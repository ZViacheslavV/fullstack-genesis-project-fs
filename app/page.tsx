import type { Metadata } from 'next';
// import LoginForm from '@/components/auth/LoginForm/LoginForm';

//===========================================================================

const SITE_URL = 'https://fullstack-genesis-project.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Головна сторінка | Лелека',
  description:
    'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, поради й ваші нотатки.',

  openGraph: {
    title: 'Головна сторінка | Лелека',
    description:
      'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, поради й ваші нотатки.',
    url: `${SITE_URL}`,
    siteName: 'Лелека',
    images: [
      {
        url: '/leleka-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Головна сторінка "Лелеки"',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Головна сторінка | Лелека',
    description:
      'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, поради й ваші нотатки.',
    images: ['/leleka-og-meta.jpg'],
  },
};

//===========================================================================

const MainPage = () => {
  return <LoginForm />;
};
export default MainPage;

// 'use client'; //TODO This is  Dashboard MVP of main page, needs many improvements

// // import type { Metadata } from 'next';
// import css from './page.module.css';
// import DashboardCardClient from '@/components/dashboard/DashboardCardClient/DashboardCardClient';
// //import { Toaster } from 'react-hot-toast';
// import TasksReminderCard from '@/components/tasks/TasksReminderCard/TasksReminderCard';
// // import moduleName from 'module';
// import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
// import FeelRecommendationCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
// import { useState } from 'react';

//===========================================================================

// export const metadata: Metadata = {};

//===========================================================================

// function Home() {
//   const [momDailyTip, setMomDailyTip] = useState<string | undefined>('');

//   return (
//     <section className={css.dashboard}>
//       <div className={css.dashboard__inner}>
//         <GreetingBlock />
//         <div className={css.dashboard__content}>
//           <div className={css.dashboard__stats}>
//             <DashboardCardClient onMomDailyTip={setMomDailyTip} />
//           </div>
//           <div className={css.dashboard__tasks}>
//             <TasksReminderCard />
//             {/* <Toaster position="top-right" /> */}
//             <FeelRecommendationCard recommendationText={momDailyTip} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// export default Home;
