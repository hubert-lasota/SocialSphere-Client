import css from "./post.module.css";
import PostAuthorButton from "./PostAuthorButton";

type PostHeaderProps = {
  profileImgSrc: string;
  onClickProfileImg: () => void;
  firstName: string;
  lastName: string;
  isCurrentUserPostAutor: boolean;
  onEdit: () => void;
  onDelete: () => void;
  dateDiff: string
};

export default function PostHeader(props: PostHeaderProps) {
  const { profileImgSrc, onClickProfileImg, firstName, lastName, isCurrentUserPostAutor, onEdit, onDelete, dateDiff } = props;
  return (
    <header className={css["post__header"]}>
      <div className={css["header__details"]}>
        <img src={profileImgSrc} alt="profile" className={css["details__profile"]} onClick={onClickProfileImg} />
        <div>
          <div className={css["details__name"]}>
            {firstName} {lastName}
          </div>
          <div className={css["details__date"]}>{dateDiff}</div>
        </div>
      </div>
      <div className={css["header__btn"]}>{isCurrentUserPostAutor && <PostAuthorButton onEdit={onEdit} onDelete={onDelete}/>}</div>
    </header>
  );
}
