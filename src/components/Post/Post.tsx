import { useRef, useState } from "react";
import { useManagePostsContext } from "../../contexts/ManagePostsContext";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import { Post as IPost } from "../../types/post.types";
import PostCommentWrapper from "./comment/PostCommentWrapper";
import css from "./post.module.css";
import PostContent from "./PostContent";
import { PostContext } from "./PostContext";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

type PostProps = {
  post: IPost;
};

export default function Post(props: PostProps) {
  const [post, setPost] = useState<IPost>(props.post);
  const { id, userId } = post;
  const { onDeletePost } = useManagePostsContext();
  const isCurrentUserPostAuthor = useIsCurrentUser(userId);

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [areCommentsOpen, setAreCommentsOpen] = useState<boolean>(false);

  const isPostAuthorBtnShown = useRef<boolean>(isCurrentUserPostAuthor);

  const handleOpenComments = () => {
    setAreCommentsOpen((prev) => !prev);
  };

  const handleOpenEditMode = () => {
    isPostAuthorBtnShown.current = false;
    setIsEditModeOn(true);
  };

  const handleDeletePost = () => {
    onDeletePost(id);
  };

  const handleCancelUpdate = () => {
    isPostAuthorBtnShown.current = isCurrentUserPostAuthor;
    setIsEditModeOn(false);
  };

  const handleUpdatePost = () => {
    isPostAuthorBtnShown.current = isCurrentUserPostAuthor;
    setIsEditModeOn(false);
  };

  const incrementPostCommentCounter = () => {
    const postClone = {...post};
    postClone.commentCount++;
    setPost(postClone);
  };

  const decrementPostCommentCounter = () => {
    const postClone = {...post};
    postClone.commentCount--;
    setPost(postClone);
  };

  return (
    <PostContext.Provider
      value={{
        post,
        openComments: handleOpenComments,
        editPost: handleOpenEditMode,
        deletePost: handleDeletePost,
        cancelUpdatePost: handleCancelUpdate,
        updatePost: handleUpdatePost,
      }}
    >
      <div className={css["post"]}>
        <PostHeader isPostAuthorButtonShown={isPostAuthorBtnShown.current} />
        <PostContent isEditModeOn={isEditModeOn} />
        <PostFooter />

        {areCommentsOpen && (
          <PostCommentWrapper
            postId={id}
            incrementPostCommentCounter={incrementPostCommentCounter}
            decrementPostCommentCounter={decrementPostCommentCounter}
          />
        )}
      </div>
    </PostContext.Provider>
  );
}
