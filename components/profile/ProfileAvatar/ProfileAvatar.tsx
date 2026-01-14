'use client';

import { User } from '@/types/user';
import css from './ProfileAvatar.module.css';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';

interface ProfileAvatarProps {
  user: User;
}

function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <div className={css.wrapper}>
      <AvatarPicker profilePhotoUrl={user.photo}>
  <p className={css.name}>{user.name}</p>
      <p className={css.email}>{user.email}</p>
      </AvatarPicker>
    </div>
  );
}

export default ProfileAvatar;
