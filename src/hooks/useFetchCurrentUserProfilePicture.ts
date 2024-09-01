import { useEffect, useRef, useState } from "react";
import userService from "../services/userService";
import base64ToImgSrc from "../utils/base64ToImgSrc";
import getDefaultUserProfilePictureSrc from "../utils/getDefaultUserProfilePictureSrc";

export default function useFetchCurrentUserProfilePicture() {
  const [picture, setPicture] = useState<string>("");
  const loading = useRef<boolean>(true);

  const fetchProfilePicture = async () => {
    loading.current = true;
    const response = await userService.getLoggedInUserProfilePicutre();
    if (response.success) {
      const pictureSrc = base64ToImgSrc(response.data);
      setPicture(pictureSrc);
    } else {
      const defaultPic = getDefaultUserProfilePictureSrc();
      setPicture(defaultPic);
    }
    loading.current = false;
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return { picture, loading: loading.current };
}
