import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function HomeNavbarRightSide() {
  const [jwt] = useLocalStorage("jwt", "");
  const [userId] = useLocalStorage("user_id", "");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  async function handleFetchUserProfilePicture() {
     const url: string = `http://localhost:8080/api/v1/user/profile/picture?userId=${userId}`;
     try {
       const response: Response = await fetch(url, {
         headers: {
           Authorization: `Bearer ${jwt}`,
         },
       });
       const profilePicture = await response.blob();
       if(profilePicture) {
        const picUrl = URL.createObjectURL(profilePicture);
        setProfilePictureUrl(picUrl);
       } else {
        setProfilePictureUrl("src/assets/default-profile-picture.png");
       }
       } catch (error) {
       console.log("Error occured whiel searching friends: ", error);
     }
  }

  useEffect(() => {
    handleFetchUserProfilePicture();
  }, []);

  return (
    <div className="home__nav-right">
      <img src={profilePictureUrl} />
    </div>
  );
}

