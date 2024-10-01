import { useEffect, useState } from "react";
import useUserService from "../services/useUserService";
import base64ToImgSrc from "../utils/base64ToImgSrc";
import getDefaultUserProfilePictureSrc from "../utils/getDefaultUserProfilePictureSrc";

export default function useFetchCurrentUserProfilePicture() {
  const userService = useUserService();
  const [picture, setPicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfilePicture = () => {
    userService
      .getLoggedInUserProfilePicutre()
      .then((response) => {
        if (response.success) {
          const pictureSrc = base64ToImgSrc(response.data);
          setPicture(pictureSrc);
        } else {
          const defaultPic = getDefaultUserProfilePictureSrc();
          setPicture(defaultPic);
        }
      })
      .catch((err) => {
        console.error("Error occured while fetching current user profile picture! Error: ", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return { picture, loading };
}
