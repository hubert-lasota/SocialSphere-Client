import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import usePostService from "../../services/usePostService";
import css from "./post.module.css";
import { usePostContext } from "./PostContext";

export default function PostFooter() {
  const { post, openComments } = usePostContext();
  const [likes, setLikes] = useState<number>(post.likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const postService = usePostService();

  const addLike = () => {
    postService.addLikeToPost(post.id).catch(() => {
      setIsLiked(false);
    });

    setIsLiked(true);
    setLikes((prev) => prev + 1);
  };

  const removeLike = () => {
    postService.removeLikeFromPost(post.id).catch(() => {
      setIsLiked(true);
    });

    setIsLiked(false);
    setLikes((prev) => prev - 1);
  };

  return (
    <div className={css["post__footer"]}>
      <div className={css["footer__like"]}>
        {isLiked ? (
          <FontAwesomeIcon icon={faHeartFilled} size="xl" onClick={removeLike} className={`${css["like__filled-icon"]}`} />
        ) : (
          <FontAwesomeIcon icon={faHeartEmpty} size="xl" onClick={addLike} className={css["like__empty-icon"]} />
        )}
        <div className={css["like__count"]}>{likes}</div>
      </div>
      <div className={css["footer__comment"]} onClick={openComments}>
        <FaRegCommentDots size={25} />
        {post.commentCount}
      </div>
    </div>
  );
}
