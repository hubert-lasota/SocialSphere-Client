import css from "./profile.module.css";

type ProfileHeaderProps = {
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  children?: React.ReactNode;
};

export default function ProfileHeader(props: ProfileHeaderProps) {
  const { firstName, lastName, profilePictureUrl, children } = props;
  return (
    <div
      className={`${css["profile__header"]}`}
    >
      <div className={`${css["header__left-side"]}`}>
        <img src={profilePictureUrl} alt="profile" className={`${css["header__left-side__profile-picture"]}`} />
        <div
          className={`${css["header__left-side__name"]}`}
        >
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
      </div>

      <div className={`${css["header__right-side"]}`}>{children}</div>
    </div>
  );
}
