import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostComment as PostCommentInterface } from "../../types/post.types";
import styles from "./post.module.css";

type PostCommentProps = {
  postComment: PostCommentInterface;
};

export default function PostComment(props: PostCommentProps) {
  const { postComment } = props;
  const { authorId, authorProfile, content } = postComment;
  const { firstName, lastName, profilePicture } = authorProfile;
  const profilePicutreUrl = profilePicture ? `data:image/png;base64,${profilePicture}` : "srcassetsdefault-profile-picture.png";
  const [currentUserId] = useLocalStorage("user_id", "");
  const navigate = useNavigate();

  function handleGoOnUserProfile() {
    if (currentUserId === authorId) {
      navigate("/me");
    } else {
      navigate(`/user/${authorId}`);
    }
  }

  return (
    <div className={styles["comments__single-comment"]}>
      <div className={styles["single-comment__header"]}>
        <img
          src={profilePicutreUrl}
          alt="profile"
          className={styles["single-comment__header__profile-picture"]}
          onClick={() => handleGoOnUserProfile()}
        />
        <span className={styles["single-comment__header__first-name"]}>{firstName}</span>
        <span className={styles["single-comment__header__last-name"]}>{lastName}</span>
      </div>

      <div className={styles["single-comment__content"]}>{content}</div>
    </div>
  );
}
