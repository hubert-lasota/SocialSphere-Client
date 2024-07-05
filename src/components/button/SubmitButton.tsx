import React from "react";
import styles from "./submit-button.module.css";

type SubmitButtonProps = {
  text?: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text } = props;

  return (
    <button
      className={`${styles["submit-btn"]} ${styles["submit-btn--fslg"]} ${styles["submit-btn--fwhite"]} ${styles["submit-btn--bgcolor-navy"]}`}
      type="submit"
    >
      {text}
    </button>
  );
}
