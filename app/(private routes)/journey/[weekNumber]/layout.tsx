import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { weekNumber: string };
};

export default async function JourneyLayout({ children, params }: Props) {
  const week = await Number(params.weekNumber);

  /*   if (Number.isNaN(week)) {
    notFound();
  } */

  return <section>{children}</section>;
}
