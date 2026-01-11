import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { weekNumber: string };
};

export default function JourneyLayout({ children, params }: Props) {
  const week = Number(params.weekNumber);

  if (Number.isNaN(week)) {
    notFound();
  }

  return <section>{children}</section>;
}
