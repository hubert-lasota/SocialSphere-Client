import { createContext, useContext } from "react";
import { Post } from "../../types/post.types";

type PostContextValue = {
  post: Post
  openComments: () => void
  editPost: (content: string) => void
  cancelUpdatePost: () => void
  updatePost: () => void
  deletePost: () => void
}

export const PostContext = createContext<PostContextValue | undefined>(undefined);

export function usePostContext() {
  const context = useContext(PostContext);
  
  if(!context) {
    throw new Error("usePostContext should be only used inside Post component");
  }

  return context;
}