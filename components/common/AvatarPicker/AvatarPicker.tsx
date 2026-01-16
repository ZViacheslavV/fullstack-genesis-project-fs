'use client';
import { useEffect, useState } from 'react';
import css from './AvatarPicker.module.css';
import Image from 'next/image';
import { updateAvatar } from '@/lib/api/clientApi';

type Props = {
  profilePhotoUrl?: string | null;
  children?: React.ReactNode;
  layout?: 'vertical' | 'horizontal';
};

function AvatarPicker({ profilePhotoUrl, children }: Props) {
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only images');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);

      try {
        setLoading(true);
        const updatedUser = await updateAvatar(file);
        if (updatedUser.photo) setPreviewUrl(updatedUser.photo);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`${css.picker} `}>
      {previewUrl && (
        <div className={css.avatarWrapper}>
          <Image src={previewUrl} alt="" fill className={css.avatarImage} />
        </div>
      )}

      <div className={css.content}>
        {children}
        <label className={css.changeButton}>
          {loading ? 'Uploading...' : 'Завантажити нове фото'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            hidden
          />
        </label>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
}

export default AvatarPicker;
