import { createContext, useContext } from "react";
import { PostComment } from "../../../types/post.types";

type PostCommentContextValue = {
  postComment: PostComment;
  deletePostComment: (postCommentId: number) => void;
};

export const PostCommentContext = createContext<PostCommentContextValue | undefined>(undefined);

export function usePostCommentContext() {
  const context = useContext(PostCommentContext);
  if (context) {
    throw new Error("usePostCommentContext should be only used inside PostCommentWrapper component");
  }

  return context;
}
