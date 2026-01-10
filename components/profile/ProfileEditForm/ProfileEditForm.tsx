'use client';

import { User } from '@/types/user';
import css from './ProfileEditForm.module.css';
import { useState } from 'react';

//===========================================================================

interface ProfileEditFormProps {
  user: User;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {

  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
    const [userGenderChoice, setUserGenderChoice] = useState('Ще не знаю');



const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGenderChoice(event.target.value);
  };


 const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
  const form = e.currentTarget.form;
  if (form) form.reset();
};

  const handleSubmit = (formData: FormData) => {
     const payload = {
      name: userName,
      email: userEmail,
      gender: userGenderChoice,
       dueDate: formData.get('dueDate'),
    };
//add send to server patch.user 
	  console.log(`sent ${payload}`);
  };

  return <div className={css.picker}>
  <form action={handleSubmit} className="">
      <label htmlFor="userName" className="">
  <input onChange={handleChangeUser} defaultValue={user.name} type="text" id="userName" />
      </label>
      <label htmlFor="userEmail" className="">
  <input  onChange={handleChangeEmail}  type="email"  id="userEmail" defaultValue={user.email}  />
      </label>
      <label htmlFor="babyGender" className="">
        <input onChange={ handleChangeGender} type="select" id="babyGender" defaultValue={user.gender} />
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
