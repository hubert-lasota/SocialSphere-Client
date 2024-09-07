import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCommentDots } from "react-icons/fa";
import css from "./post.module.css";

type PostFooterProps = {
  isPostLiked: boolean;
  likesSum: number;
  commentsSum: number;
  onAddLike: () => void;
  onRemoveLike: () => void;
  onClickComments: () => void;
};

export default function PostFooter(props: PostFooterProps) {
  const { isPostLiked, likesSum, commentsSum, onAddLike, onRemoveLike, onClickComments } = props;

  return (
    <div className={css["post__footer"]}>
      <div className={css["footer__like"]}>
        {isPostLiked ? (
          <FontAwesomeIcon icon={faHeartFilled} size="xl" onClick={onRemoveLike} className={`${css["like__filled-icon"]}`} />
        ) : (
          <FontAwesomeIcon icon={faHeartEmpty} size="xl" onClick={onAddLike} className={css["like__empty-icon"]} />
        )}
        <div className={css["like__count"]}>{likesSum}</div>
      </div>
      <div className={css["footer__comment"]} onClick={onClickComments}>
        <FaRegCommentDots size={25} />
        {commentsSum}
      </div>
    </div>
  );
}
