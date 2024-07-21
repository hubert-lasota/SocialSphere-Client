import css from "./profile.module.css";

type ProfileHeaderButtonProps = {
  text?: string | null;
  style?: React.CSSProperties
  handleClick?: () => void;
};

export default function ProfileHeaderButton(props: ProfileHeaderButtonProps) {
  const { text, style, handleClick } = props;
  return (
    <button style={style} className={`${css["header__right-side__btn"]}`} onClick={handleClick}>
      {text}
    </button>
  );
}
