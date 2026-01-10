'use client';

import { User } from '@/types/user';
import css from './ProfileEditForm.module.css';
import { useState } from 'react';
// import { updateMe } from '@/lib/api/clientApi';

//===========================================================================

interface ProfileEditFormProps {
  user: User;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {

  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userGenderChoice, setUserGenderChoice] = useState(user.gender ?? 'Ще не знаю');
   const [userDateChoice, setUserDateChoice] = useState(  user.dueDate ?? '');



const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
 const handleChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setUserGenderChoice(e.target.value);
};
  const handleDateChoice= (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDateChoice(event.target.value);
  }

 const handleClick = () => {
setUserName(user.name);
  setUserEmail(user.email);
  setUserGenderChoice(user.gender ?? 'Ще не знаю');
  setUserDateChoice(user.dueDate ?? '');
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
     const payload = {
      name: userName,
      email: userEmail,
      gender: userGenderChoice,
       dueDate: userDateChoice,
    };
//     try {
  ///update on server
    //       const updatedUser = updateMe(payload);
    
	  // console.log(`sent ${payload}`);
//     } catch {
      
// }
  };

  return <div className={css.picker}>
  <form onSubmit={handleSubmit} className="">
      <label htmlFor="userName" className="">
  <input onChange={handleChangeUser}type="text" id="userName"   value={userName} />
      </label>
      <label htmlFor="userEmail" className="">
  <input  onChange={handleChangeEmail}  type="email"  id="userEmail"   value={userEmail} />
      </label>
        <select value={userGenderChoice} onChange={handleChangeGender}>
  <option>Ще не знаю</option>
  <option>Хлопчик</option>
  <option>Дівчинка</option>
</select>
      <label htmlFor="babyDueDate" className="">
  <input onChange={ handleDateChoice} type="date" id="babyDueDate"   value={userDateChoice}/>
      </label>
      <button type="button" className="" onClick={handleClick} >cancel changes</button>
       <button type="submit" className="" >save changes</button>
    </form>

  </div>;
}

export default ProfileEditForm;
