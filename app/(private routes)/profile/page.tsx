
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
    <div className="">
      <ProfileAvatar profilePhotoUrl = {user.photo || ''} />
      <p className="">{ user.name}</p>
      <p className="">{ user.email}</p>
    </div>
    <ProfileEditForm user={user} />
  </>);
};

export default ProfilePage;
