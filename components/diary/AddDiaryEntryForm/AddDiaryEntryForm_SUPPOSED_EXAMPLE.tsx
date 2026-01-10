'use client';

type AddDiaryEntryFormProps = {
  onSuccess: () => void;
  initialValues?: Record<string, unknown>;
  mode?: 'create' | 'edit';
};

export default function AddDiaryEntryForm({
  onSuccess,
  initialValues,
  mode = 'create',
}: AddDiaryEntryFormProps) {
  return (
    <div>
      <p>AddDiaryEntryForm placeholder</p>
      <p>Mode: {mode}</p>

      <button type="button" onClick={onSuccess}>
        Close modal
      </button>
    </div>
  );
}

