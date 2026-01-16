'use client';
import { User } from '@/types/user';
import css from './ProfileAvatar.module.css';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
// import { useState } from 'react';

interface Props {
  user: User;
}

function ProfileAvatar({ user }: Props) {
  // const [imageFile, setImageFile] = useState<File | null>(null);
  return (
    <AvatarPicker
      profilePhotoUrl={user.photo}
      buttonVariant="profile"
      // onChangePhoto={setImageFile}
    >
      <p className={css.name}>{user.name}</p>
      <p className={css.email}>{user.email}</p>
    </AvatarPicker>
  );
}

export default ProfileAvatar;
