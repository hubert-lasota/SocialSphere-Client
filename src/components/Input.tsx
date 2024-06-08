import React, { forwardRef } from "react";

type InputProps = {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, placeholder, value, onChange, onFocus } = props;
  console.log(className);
  return (
    <input
      ref={ref}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
});


export default Input;