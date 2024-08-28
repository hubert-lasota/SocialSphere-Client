import React from "react";
import css from "./submit-button.module.css";

type SubmitButtonProps = {
  text?: string;
  style?: React.CSSProperties
  type?: "button" | "submit" | "reset"
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text, style, type = "submit" } = props;

  return (
    <button
      style={style}
      className={`${css["submit-btn"]}`}
      type={type}
    >
      {text}
    </button>
  );
}
