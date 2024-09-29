import { createContext, useContext } from "react";
import { Post } from "../../types/post.types";
import { User, UserProfile, UserProfileConfig, UserWithProfile } from "../../types/user.types";
import { ProfileContentType } from "./profile.types";

type ProfileContextValue = {
  profileContentType: ProfileContentType;
  user: User;
  userProfile: UserProfile;
  userConfig: UserProfileConfig;
  posts: Post[];
  fetchNextPostPage: () => void;
  setProfileContentType: (contentType: ProfileContentType) => void;
  friends: UserWithProfile[]
  fetchNextFriendPage: () => void
};

export const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext should be only used inside Profile component");
  }

  return context;
}
