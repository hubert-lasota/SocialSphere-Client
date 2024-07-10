import styles from "./profile.module.css";

type ProfileHeaderButtonProps = {
  text?: string | null;
  style?: React.CSSProperties
  handleClick?: () => void;
};

export default function ProfileHeaderButton(props: ProfileHeaderButtonProps) {
  const { text, style, handleClick } = props;
  return (
    <button style={style} className={`${styles["header__right-side__btn"]} ${styles["header__right-side__btn--bgcolor-navy"]} ${styles["header__right-side__btn--fcolor-white"]}`} onClick={handleClick}>
      {text}
    </button>
  );
}
