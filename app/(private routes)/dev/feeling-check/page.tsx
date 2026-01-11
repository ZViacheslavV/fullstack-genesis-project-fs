import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';

export default function Page() {
  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 704 }}>
        <FeelingCheckCard recommendationText="Занотуйте незвичні відчуття у тілі." />
      </div>
    </div>
  );
}


