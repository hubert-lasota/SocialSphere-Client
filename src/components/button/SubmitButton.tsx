import React from "react";
import styles from "./submit-button.module.css";

type SubmitButtonProps = {
  text?: string;
  style?: React.CSSProperties
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text, style } = props;

  return (
    <button
      style={style}
      className={`${styles["submit-btn"]} ${styles["submit-btn--fslg"]} ${styles["submit-btn--fwhite"]} ${styles["submit-btn--bgcolor-navy"]}`}
      type="submit"
    >
      {text}
    </button>
  );
}
