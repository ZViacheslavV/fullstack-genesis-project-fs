'use client';

import type { FormEvent } from 'react';

type AddTaskFormProps = {
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function AddTaskForm({ onSuccess, mode = 'create', initialValues }: AddTaskFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          Назва
          <input name="title" defaultValue={(initialValues?.title as string) ?? ''} />
        </label>

        <button type="submit">{mode === 'edit' ? 'Зберегти зміни' : 'Зберегти'}</button>
      </div>
    </form>
  );
}

export default AddTaskForm;

