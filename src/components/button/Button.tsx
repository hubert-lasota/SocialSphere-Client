import React from "react";
import css from "./button.module.css";

type ButtonProps = {
  styleType: "primary" | "secondary";
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  additionalStyle?: string
};

export default function Button(props: ButtonProps) {
  const { styleType, children, type = "button", onClick, additionalStyle } = props;

  let className = css["btn"];
  if(additionalStyle) {
    className += " " + additionalStyle;
  }

  if (styleType === "primary") {
    className += " " + css["primary"];
  } else {
    className += " " + css["secondary"];
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
