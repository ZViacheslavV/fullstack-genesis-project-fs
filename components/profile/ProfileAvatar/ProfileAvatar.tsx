'use client';

import { useEffect, useState } from 'react';
import css from './ProfileAvatar.module.css';
import Image from 'next/image';


type Props = {
  profilePhotoUrl?: string;
};


function ProfileAvatar({ profilePhotoUrl }: Props) {
const [previewUrl, setPreviewUrl] = useState<string>('');
const [error, setError] = useState<string>('');

useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };

const handleRemove = () => {
    setPreviewUrl('');
  };



  return <div className={css.picker}>
    {previewUrl ? (
      <Image src={previewUrl} alt='Preview' width={300} height={300} />
    ) :
      (<label htmlFor="avatar" >
        Avatar
        <input id="avatar" type="file" accept="image/*" onChange={handleFileChange} />
      </label>)}
    
    {previewUrl && (
          <button onClick={handleRemove}>
            x
          </button>
        )}
     {error && <p>{error}</p>}
  </div>;
}

export default ProfileAvatar;
