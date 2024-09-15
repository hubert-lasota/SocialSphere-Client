import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import getDateDifference from "../../utils/getDateDifference";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./post.module.css";
import PostAuthorButton from "./PostAuthorButton";
import { usePostContext } from "./PostContext";

type PostHeaderProps = {
  isPostAuthorButtonShown: boolean;
};

export default function PostHeader(props: PostHeaderProps) {
  const { isPostAuthorButtonShown } = props;
  const { post } = usePostContext();
  const { firstName, lastName, profilePicture } = post.userProfile;
  const navigate = useNavigateToUserProfile();

  return (
    <header className={css["post__header"]}>
      <div className={css["header__details"]}>
        <img src={getUserProfileImgSrc(profilePicture)} alt="profile" className={css["details__profile"]} onClick={() => navigate(post.userId)} />
        <div>
          <div className={css["details__name"]}>
            {firstName} {lastName}
          </div>
          <div className={css["details__date"]}>{getDateDifference(new Date(post.createdAt))}</div>
        </div>
      </div>
      <div className={css["header__btn"]}>{isPostAuthorButtonShown && <PostAuthorButton />}</div>
    </header>
  );
}
