import { DashboardMainClient } from '@/components/dashboard/DashboardMainClient/DashboardMainClient';
import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import {
  getServerTasks,
  getWeeksCurrentServer,
  getWeeksDemoServer,
} from '@/lib/api/serverApi';

//===========================================================================

export const SITE_URL = 'https://fullstack-genesis-project.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Головна сторінка | Лелека',
  description:
    'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, отримайте поради й збережіть ваші нотатки.',

  openGraph: {
    title: 'Головна сторінка | Лелека',
    description:
      'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, отримайте поради й збережіть ваші нотатки.',
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
      'Прогляньте детальну інформацію про розвиток дитини в залежності від тижня вашої вагітності, отримайте поради й збережіть ваші нотатки.',
    images: ['/leleka-og-meta.jpg'],
  },
};

//===========================================================================

const Home = async () => {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const hasAuth = cookieStore.has('accessToken');

  const prefetches = [
    queryClient.prefetchQuery({
      queryKey: ['weeks'],
      queryFn: () => (hasAuth ? getWeeksCurrentServer() : getWeeksDemoServer()),
    }),
  ];

  if (hasAuth) {
    prefetches.push(
      queryClient.prefetchQuery({
        queryKey: ['task'],
        queryFn: getServerTasks,
      })
    );
  }

  await Promise.all(prefetches);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMainClient hasAuth={hasAuth} />
    </HydrationBoundary>
  );
};
export default Home;
