import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
// import { cookies } from 'next/headers';

import {
  getBabyWeeksServer,
  getMomWeeksServer,
  getServerTasks,
  getWeeksCurrentServer,
} from '@/lib/api/serverApi';
import JourneyPageClient from '@/components/journey/JourneyPageClient/JourneyPageClient';
import { SITE_URL } from '../../page';

//===========================================================================

type Props = {
  params: Promise<{ weekNumber: string }>;
};

//===========================================================================

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { weekNumber } = await params;

  return {
    title: 'Подорож | Лелека',
    description:
      'Зробіть віртуальну подорож по розвитку вашого малюка й запишіть свої задачі',
    openGraph: {
      title: 'Подорож | Лелека',
      description:
        'Зробіть віртуальну подорож по розвитку вашого малюка й запишіть свої задачі',
      url: `${SITE_URL}/journey/${weekNumber}`,
      siteName: 'Лелека',
      images: [
        {
          url: '/leleka-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Leleka image',
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Подорож | Лелека',
      description:
        'Зробіть віртуальну подорож по розвитку вашого малюка й запишіть свої задачі',
      images: ['/leleka-og-meta.jpg'],
    },
  };
};

//===========================================================================

const JourneyPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const { weekNumber } = await params;

  /*   const cookieStore = await cookies();
  const hasAuth = cookieStore.has('accessToken'); */

  const week = Number(weekNumber);
  //  if (!Number.isFinite(week) || week < 1) notFound(); //TODO handle wrong inputs

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weeks'],
      queryFn: getWeeksCurrentServer,
    }),
    queryClient.prefetchQuery({
      queryKey: ['mom', week],
      queryFn: () => getMomWeeksServer(week),
    }),
    queryClient.prefetchQuery({
      queryKey: ['baby', week],
      queryFn: () => getBabyWeeksServer(week),
    }),
    queryClient.prefetchQuery({
      queryKey: ['task'],
      queryFn: getServerTasks,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient />
    </HydrationBoundary>
  );
};
export default JourneyPage;
