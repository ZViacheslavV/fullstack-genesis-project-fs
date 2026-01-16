'use client';
import { User } from '@/types/user';
import css from './ProfileAvatar.module.css';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';

interface Props {
  user: User;
}

function ProfileAvatar({ user }: Props) {
  return (
    <AvatarPicker profilePhotoUrl={user.photo} buttonVariant="profile">
      <p className={css.name}>{user.name}</p>
      <p className={css.email}>{user.email}</p>
    </AvatarPicker>
  );
}

export default ProfileAvatar;
