
import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
import css from './page.module.css'

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
  const user = await getServerMe();
  return (<>
    <h1 className={css.hidden}>User profile</h1>
    <ProfileAvatar user={user}/>
    <ProfileEditForm user={user} />
  </>);
};

export default ProfilePage;
