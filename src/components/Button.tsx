import React from 'react'

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text?: string;
  className?: string
}

export default function Button(props: ButtonProps) {
  const { className, type, text } = props;
  
  return (
    <button className={className} type={type}>{text}</button>
  );
}
