import { createContext, useContext } from "react";
import { PostRequest } from "../types/post.types";

type PostContextValue = {
  onAddPost: (post: PostRequest) => Promise<void>;
  onDeletePost: (postId: number) => Promise<void>;
};

export const PostContext = createContext<PostContextValue | undefined>(undefined);

export function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("PostContext is undefined. It needs to be wrapped in PostContext.Provider");
  }

  return context;
}
