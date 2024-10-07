import { createContext, useContext } from "react";
import { PostRequest } from "../types/post.types";

type ManagePostsContextValue = {
  currentUserProfilePictureSrc: string;
  onAddPost: (post: PostRequest) => Promise<void>;
  onDeletePost: (postId: number) => Promise<void>;
};

export const ManagePostsContext = createContext<ManagePostsContextValue | undefined>(undefined);

export function useManagePostsContext() {
  const context = useContext(ManagePostsContext);

  if (!context) {
    throw new Error("ManagePostsContext is undefined. It needs to be wrapped in ManagePostsContext.Provider");
  }

  return context;
}
