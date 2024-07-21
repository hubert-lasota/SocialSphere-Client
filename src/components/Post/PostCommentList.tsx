import React, { useEffect, useState } from "react";
import postService from "../../services/postService";
import { PostComment, PostCommentResponse } from "../../types/post.types";
import SubmitButton from "../button/SubmitButton";
import css from "./post.module.css";
import PostCommentComponent from "./PostComment";

type PostCommentListProps = {
  postId: number;
  handleIncrementCommentCounter: () => void;
};

export default function PostCommentList(props: PostCommentListProps) {
  const { postId, handleIncrementCommentCounter } = props;
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [isLast, setIsLast] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  async function handleFetchPostComments() {
    const postCommentPage = await postService.findPostCommentPage(postId.toString(), "0", "5");
    if (postCommentPage && postCommentPage?.content) {
      const comments = postCommentPage.content;
      setPostComments(comments);
      setIsLast(postCommentPage.last);
    }
  }

  async function handleShowMoreComments() {
    if (isLast) return;

    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);

    const postCommentPage = await postService.findPostCommentPage(postId.toString(), nextPage.toString(), "5");
    if (postCommentPage && !postCommentPage.last) {
      const comments = [...postComments, ...postCommentPage.content];
      setPostComments(comments);
      setIsLast(postCommentPage.last);
    } else {
      setIsLast(true);
    }
  }

  async function handleAddComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response: PostCommentResponse = await postService.createPostComment(postId.toString(), textareaValue);
    if (response && response.success) {
      handleIncrementCommentCounter();
      const comments: PostComment[] = [response.comment, ...postComments];
      setPostComments(comments);
    }
    setTextareaValue("");
  }

  useEffect(() => {
    handleFetchPostComments();
  }, []);

  return (
    <div className={css["post__comments"]}>
      <form onSubmit={(e) => handleAddComment(e)} className={css["comments__create-comment"]}>
        <textarea
          placeholder="Write comment!"
          className={css["create-comment__input-field"]}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
        <SubmitButton text="Comment" style={{ flexBasis: "25%", marginTop: 0, padding: "0.8rem", fontSize: "1.1rem" }} />
      </form>
      {postComments && postComments.length > 0 ? (
        postComments.map((postComment) => <PostCommentComponent key={postComment.id} postComment={postComment} />)
      ) : (
        <></>
      )}

      {!isLast && postComments.length > 0 ? (
        <button
          className={`${css["comments__show-more-btn"]}`}
          onClick={() => handleShowMoreComments()}
        >
          Show more comments
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
