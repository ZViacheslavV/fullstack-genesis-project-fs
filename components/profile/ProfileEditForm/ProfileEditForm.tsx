'use client';

import { User } from '@/types/user';
import css from './ProfileEditForm.module.css';
import { useState } from 'react';

//===========================================================================

interface ProfileEditFormProps {
  user: User;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {

const [avatarFile, setAvatarFile] = useState<File | null>(null);


 const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
  setAvatarFile(null);
  const form = e.currentTarget.form;
  if (form) form.reset();
};

  const handleSubmit = (formData: FormData) => {
       if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
     const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      gender: formData.get('gender'),
       dueDate: formData.get('dueDate'),
      photo: avatarFile,
    };
//add send to server patch.user 
	  console.log(`sent ${payload}`);
  };

  return <div className={css.picker}>
  <form action={handleSubmit} className="">
      <label htmlFor="userName" className="">
  <input defaultValue={user.name} type="text" id="userName" />
      </label>
      <label htmlFor="userEmail" className="">
  <input  type="text"  id="userEmail" defaultValue={user.email}  />
      </label>
      <label htmlFor="babyGender" className="">
  <input  type="select" id="babyGender" defaultValue={user.gender} />
      </label>
      <label htmlFor="babyDueDate" className="">
  <input type="select" id="babyDueDate" defaultValue={user.dueDate} />
      </label>
      <button className="" onClick={handleClick} >cancel changes</button>
       <button type="submit" className="" >save changes</button>
    </form>

  </div>;
}

export default ProfileEditForm;
