// components/diary/GreetingBlock/GreetingBlock.tsx

type GreetingBlockProps = {
  userName?: string;
};

export default function GreetingBlock({ userName }: GreetingBlockProps) {
  return (
    <section>
      <h2>Доброго ранку{userName ? `, ${userName}` : ''}!</h2>
    </section>
  );
}
