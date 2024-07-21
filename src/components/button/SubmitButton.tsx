import React from "react";
import css from "./submit-button.module.css";

type SubmitButtonProps = {
  text?: string;
  style?: React.CSSProperties
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text, style } = props;

  return (
    <button
      style={style}
      className={`${css["submit-btn"]}`}
      type="submit"
    >
      {text}
    </button>
  );
}
