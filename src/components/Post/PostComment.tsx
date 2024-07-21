import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { PostComment as PostCommentInterface } from "../../types/post.types";
import css from "./post.module.css";

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
    <div className={css["comments__single-comment"]}>
      <img
        src={profilePicutreUrl}
        alt="profile"
        className={css["single-comment__profile-picture"]}
        onClick={() => handleGoOnUserProfile()}
      />
      <div className={css["single-comment__text"]}>
        <div className={`${css["single-comment__text__first-name"]}`}>{firstName}</div>
        <div className={`${css["single-comment__text__last-name"]}`}>{lastName}</div>
        <div className={`${css["single-comment__text__content"]}`}>{content}</div>
      </div>
    </div>
  );
}
