import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile",
  openGraph: {
    title: 'Profile',
    description: 'User profile.',
    url: '/',
    images: [
      {
        url: '/',
        width: 1200,
        height: 630,
        alt: 'Profile',
      },
    ],
  },
};




async function ProfilePage() {
  const user = await getMe();

  const handleClick = () => {

  };
  const handleSubmit = (formData: FormData) => {

	  console.log(`sent ${formData}`);
  };

  return (<div>
    <div>
    <Image
        src={user.photo}
        alt="User Avatar"
        width={120}
        height={120}
      />
    <p className="">username</p>
    <p className="">email</p>
    </div>
    <button className="" onClick={handleClick} >update picture</button>
    <form action={handleSubmit} className="">
      <label htmlFor="userName" className="">
  <input defaultValue={user.name} type="text" id="userName" />
      </label>
      <label htmlFor="userEmail" className="">
  <input  type="text"  id="userEmail" defaultValue={user.email}  />
      </label>
      <label htmlFor="babyGender" className="">
  <input  type="select" id="babyGender" defaultValue={user.childGender} />
      </label>
      <label htmlFor="babyDueDate" className="">
  <input type="select" id="babyDueDate" defaultValue={user.dueDate} />
      </label>
      <button type="submit" className="" >save changes</button>
      <button className="" onClick={() => 'refresh'} >refresh</button>
    </form>
  </div>);
};

export default ProfilePage;
