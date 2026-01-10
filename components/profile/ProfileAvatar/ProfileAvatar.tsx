'use client';

import { useState } from 'react';
import css from './ProfileAvatar.module.css';
import Image from 'next/image';

type Props = {
  profilePhotoUrl?: string;
};

function ProfileAvatar({ profilePhotoUrl }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>(profilePhotoUrl ?? '');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only images are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreviewUrl('');
  };

  return (
    <div className={css.picker}>
      {previewUrl ? (
        <div className="">
          <Image src={previewUrl} alt="Preview" width={300} height={300} />
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
        </div>
      ) : (
        <label htmlFor="avatar">
          Upload Avatar
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
      {error && <p className="">{error}</p>}
    </div>
  );
}

export default ProfileAvatar;