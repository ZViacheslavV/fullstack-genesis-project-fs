'use client';


import { User } from '@/types/user';
import css from './ProfileAvatar.module.css';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';


interface ProfileAvatarProps {
  user: User;
}

function ProfileAvatar({user}:ProfileAvatarProps) {
  return (<>
    <p className="">{ user.name}</p>
    <p className="">{user.email}</p>
    <AvatarPicker/>
  </>);
}

export default ProfileAvatar;