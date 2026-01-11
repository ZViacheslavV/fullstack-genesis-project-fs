'use client';

import {useState } from 'react';
import css from './AvatarPicker.module.css';
import Image from 'next/image';
import { updateAvatar} from '@/lib/api/clientApi';

//===========================================================================


type Props = {
  profilePhotoUrl?: string | null;
};

function AvatarPicker({ profilePhotoUrl }: Props) {
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl ?? '');
  const [loading, setLoading] = useState(false);



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
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
     reader.readAsDataURL(file);
      try {
      setLoading(true);
      const updatedUser = await updateAvatar(file);

      if (updatedUser.photo) {
        setPreviewUrl(updatedUser.photo);
      }
    } catch (err) {
        console.log(err)
    } finally {
      setLoading(false);
    }
   }
  
  };

   const handleRemove = () => {
    setPreviewUrl('');
    setError('');
  };

  return (
    <div className="">
      <div ></div>
      {previewUrl &&
        <Image  src={previewUrl} alt='Preview' width={300} height={300} />}
        <label>
           {loading ? 'Uploading...' : 'Завантажити фото'}
          <input type='file' accept='image/*' onChange={handleFileChange} disabled={loading} />
        </label>
      {previewUrl && (
          <button className='' onClick={handleRemove}>
            Видалити
          </button>
        )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default AvatarPicker;
