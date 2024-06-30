import React from "react";

type SubmitButtonProps = {
  text?: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text } = props;

  return (
    <button
      className="sign-in__btn sign-in__btn--fslg sign-in__btn--fwhite sign-in__btn--bgcolor-navy"
      type="submit"
    >
      {text}
    </button>
  );
}
