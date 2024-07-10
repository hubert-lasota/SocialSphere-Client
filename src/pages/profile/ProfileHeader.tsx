import styles from "./profile.module.css";

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
      className={`${styles["profile__header"]} ${styles["profile__header--bgcolor-white"]} ${styles["profile__header--brd-btm-grey"]}`}
    >
        <div className={`${styles["header__left-side"]}`}>
            <img src={profilePictureUrl} alt="profile" className={`${styles["header__left-side__profile-picture"]}`}/>
            <div className={`${styles["header__left-side__name"]} ${styles["header__left-side__name--fslg"]} ${styles["header__left-side__name--fcolor-grey"]}`}>
                <span>{firstName}</span>
                <span>{lastName}</span>
            </div>
        </div>

        <div className={`${styles["header__right-side"]}`}>
            {children}
        </div>
    </div>
  );
}
