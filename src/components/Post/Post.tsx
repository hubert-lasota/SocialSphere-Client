import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartEmpty,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import postService from '../../services/postService';
import { PostLikeResponse } from '../../types/post.types';
import styles from "./post.module.css"


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

export default function Post(props: PostProps, ) {
  const { id, userId, profilePictureSrc, firstName, lastName, content, likeCount, commentCount, isLiked, children } = props;
  const [ isPostLiked, setIsPostLiked ] = useState<boolean>(isLiked);
  const [ likeCounter, setLikeCounter ] = useState<number>(likeCount);
  const navigate = useNavigate();
  
  function handleGoOnUserPage(userId: number) {
    navigate(`/user/${userId}`);
  }

  async function handleLikePost(postId: number) {
    let response: PostLikeResponse;
    if(isPostLiked) {
      response = await postService.removeLikeFromPost(postId.toString());
      if(response.success) {
        const newLikeCount = likeCounter - 1;
        setLikeCounter(newLikeCount);
        setIsPostLiked(false);
      }
    } else {
      response = await postService.addLikeToPost(postId.toString());
      if(response.success) {
        const newLikeCount = likeCounter + 1;
        setLikeCounter(newLikeCount);
        setIsPostLiked(true);
      }
    }
  }

  return (
    <div key={id} className={`${styles["post"]} ${styles["post--bg-white"]}`}>
      <div className={styles["post__header"]}>
        <img
          src={profilePictureSrc}
          alt="profile"
          className={styles["header__profile-picture"]}
          onClick={() => handleGoOnUserPage(userId)}
        />
        <div className={styles["header__name"]}>
          <span className={`${styles["header__name__text"]} ${styles["header__name__text--fsmd"]} ${styles["header__name__text--grey"]}`}>
            {firstName}
          </span>
          <span className={`${styles["header__name__text"]} ${styles["header__name__text--fsmd"]} ${styles["header__name__text--grey"]}`}>
            {lastName}
          </span>
        </div>
      </div>
      <div className={styles["post__content"]}>
        <p className={`${styles["content__text"]} ${styles["content__text--fsmd"]}`}>{content}</p>
        {children}
      </div>
      <div className={styles["post__footer"]}>
        <div className={styles["footer__like"]}>
          <div className={styles["like__icon"]} onClick={() => handleLikePost(id)}>
            {isPostLiked ? <FontAwesomeIcon icon={faHeartFilled} size="xl" className={`${styles["like__filled-icon"]} ${styles["like__filled-icon--red"]}`}/> 
            : <FontAwesomeIcon icon={faHeartEmpty} size="xl" className={styles["like__empty-icon"]}/>}
          </div>
          <span className={styles["like__text"]} >{likeCounter} likes</span>
        </div>
        <div className={styles["footer__comment"]}><FontAwesomeIcon icon={faComment} />
          {commentCount} comments
        </div>
      </div>
    </div>
  );
}
