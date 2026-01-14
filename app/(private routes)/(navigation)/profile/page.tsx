
import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

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
    <ProfileAvatar user={user}/>
    <ProfileEditForm user={user} />
  </>);
};

export default ProfilePage;
