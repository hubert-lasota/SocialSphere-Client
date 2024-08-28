import base64ToImgSrc from "./base64ToImgSrc";
import getDefaultUserProfilePictureSrc from "./getDefaultUserProfilePictureSrc";

export default function getUserProfileImgSrc(base64: string | null): string {
  if (base64) {
    return base64ToImgSrc(base64);
  } else {
    return getDefaultUserProfilePictureSrc();
  }
}
