import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./modal.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  additionalClassName?: string
};

export default function Modal(props: ModalProps) {
  const { open, onClose, children, additionalClassName } = props;

  if (!open) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  });

  return createPortal(
    <>
      <div className={css["overlay"]} onClick={onClose}></div>
      <div className={css["modal"] + ` ${additionalClassName}`}>{children}</div>
    </>,
    document.getElementById("portal")!
  );
}
