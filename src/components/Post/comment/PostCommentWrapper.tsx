import usePostService from "../../../services/usePostService";
import css from "../post.module.css";
import AddPostComment from "./AddPostComment";
import PostComment from "./PostComment";
import { PostCommentContext } from "./PostCommentContext";
import useFetchPostComments from "./useFetchPostComments";

type PostCommentWrapper = {
  postId: number;
  decrementPostCommentCounter: () => void;
  incrementPostCommentCounter: () => void;
};

export default function PostCommentWrapper(props: PostCommentWrapper) {
  const { postId, decrementPostCommentCounter, incrementPostCommentCounter } = props;
  const { comments, setComments, last, fetchNextCommentPage } = useFetchPostComments(postId);
  const postService = usePostService();

  const handleDeletePostComment = (postCommentId: number) => {
    postService.deletePostComment(postCommentId).then((response) => {
      if (response.success) {
        const coms = comments.filter((c) => c.id !== postCommentId);
        setComments(coms);
      }
    });
    decrementPostCommentCounter();
  };

  const handleAddPostComment = (content: string) => {
    postService.createPostComment(postId, content).then((response) => {
      if (response.success) {
        const com = response.data;
        setComments((prev) => [com, ...prev]);
      }
    });
    incrementPostCommentCounter();
  };

  return (
    <>
      <AddPostComment onAddPostComment={handleAddPostComment} />

      {comments.map((comment) => {
        return (
          <PostCommentContext.Provider
            value={{
              postComment: comment,
              deletePostComment: handleDeletePostComment,
            }}
          >
            <PostComment comment={comment} postId={postId} onDelete={handleDeletePostComment} key={comment.id} />
          </PostCommentContext.Provider>
        );
      })}
      {!last && (
        <div className={css["comment__show-more-btn"]} onClick={fetchNextCommentPage}>
          <span>Show more comments</span>
        </div>
      )}
    </>
  );
}
