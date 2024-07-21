import { faComments, faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import postService from "../../services/postService";
import { PostLikeResponse } from "../../types/post.types";
import css from "./post.module.css";
import PostCommentList from "./PostCommentList";

type PostProps = {
  id: number;
  userId: number;
  profilePictureSrc: string;
  firstName: string;
  lastName: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  children?: React.ReactNode;
};

export default function Post(props: PostProps) {
  const { id, userId, profilePictureSrc, firstName, lastName, content, likeCount, commentCount, isLiked, children } = props;
  const [currentUserId] = useLocalStorage("user_id", "");
  const [isPostLiked, setIsPostLiked] = useState<boolean>(isLiked);
  const [likeCounter, setLikeCounter] = useState<number>(likeCount);
  const [commentCounter, setCommentCounter] = useState<number>(commentCount);
  const [arePostCommentsOpen, setArePostCommentsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleGoOnUserPage(userId: number) {
    if (currentUserId === userId) {
      navigate("/me");
    } else {
      navigate(`/user/${userId}`);
    }
  }

  async function handleAddLikeToPost(postId: number) {
    const response: PostLikeResponse = await postService.addLikeToPost(postId.toString());
    if (response.success) {
      const newLikeCount = likeCounter + 1;
      setLikeCounter(newLikeCount);
      setIsPostLiked(true);
    }
  }

  async function handleRemoveLikeFromPost(postId: number) {
    const response: PostLikeResponse = await postService.removeLikeFromPost(postId.toString());
    if (response.success) {
      const newLikeCount = likeCounter - 1;
      setLikeCounter(newLikeCount);
      setIsPostLiked(false);
    }
  }

  function handleOpenPostComments() {
    if (arePostCommentsOpen) {
      setArePostCommentsOpen(false);
    } else {
      setArePostCommentsOpen(true);
    }
  }

  function handleIncementCommentCounter() {
    const newValue = commentCounter + 1;
    setCommentCounter(newValue);
  }

  return (
    <div key={id} className={`${css["post"]}`}>
      <div className={css["post__header"]}>
        <img
          src={profilePictureSrc}
          alt="profile"
          className={css["header__profile-picture"]}
          onClick={() => handleGoOnUserPage(userId)}
        />
        <div className={css["header__name"]}>
          <span className={`${css["header__name__text"]}`}>{firstName}</span>
          <span className={`${css["header__name__text"]}`}>{lastName}</span>
        </div>
      </div>
      <div className={css["post__content"]}>
        <p className={`${css["content__text"]}`}>{content}</p>
        {children}
      </div>
      <div className={css["post__footer"]}>
        <div className={css["footer__like"]}>
          <div className={css["like__icon"]}>
            {isPostLiked ? (
              <FontAwesomeIcon
                icon={faHeartFilled}
                size="xl"
                onClick={() => handleRemoveLikeFromPost(id)}
                className={`${css["like__filled-icon"]}`}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartEmpty}
                size="xl"
                onClick={() => handleAddLikeToPost(id)}
                className={css["like__empty-icon"]}
              />
            )}
          </div>
          <span className={css["like__text"]}>
            {likeCounter > 1 ? likeCounter : ""} {likeCounter > 1 && likeCounter !== 0 ? "people like that post" : ""}
            {likeCounter === 0 ? "" : "one person likes that post"}
          </span>
        </div>
        <div className={css["footer__comment"]} onClick={() => handleOpenPostComments()}>
          <div className={css["footer__comment__box"]}>
            <FontAwesomeIcon icon={faComments} size="xl" />
            <span className={css["footer__comment__box__text"]}>{commentCounter} comments</span>
          </div>
        </div>
      </div>
      {arePostCommentsOpen ? <PostCommentList postId={id} handleIncrementCommentCounter={handleIncementCommentCounter} /> : <></>}
    </div>
  );
}
