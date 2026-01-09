'use client';

import type { FormEvent } from 'react';

type AddDiaryEntryFormProps = {
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function AddDiaryEntryForm({
  onSuccess,
  mode = 'create',
  initialValues,
}: AddDiaryEntryFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          Заголовок
          <input
            name="title"
            defaultValue={(initialValues?.title as string) ?? ''}
          />
        </label>

        <label>
          Текст
          <textarea
            name="content"
            defaultValue={(initialValues?.content as string) ?? ''}
          />
        </label>

        <button type="submit">
          {mode === 'edit' ? 'Зберегти зміни' : 'Зберегти'}
        </button>
      </div>
    </form>
  );
}

export default AddDiaryEntryForm;


