import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import css from "./dropdown.module.css";

type DropdownProps = {
  children: React.ReactNode;
  type?: "three-dots" | "text" | "img";
  text?: string;
  imgSrc?: string;
  additionalClassName?: string;
};

export default function Dropdown(props: DropdownProps) {
  const { children, type = "three-dots", text, imgSrc, additionalClassName } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const handleClickMenuItem = (e: MouseEvent) => {
      if (menuRef.current!.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    menuRef.current.onclick = handleClickMenuItem;
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;

    const handleClickOutsideDropdown = (e: MouseEvent) => {
      if (!dropdownRef.current!.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const clickDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  return (
    <div ref={dropdownRef} className={css["dropdown"] + " " + additionalClassName}>
      <div className={css["dropdown__menu-btn"]} onClick={clickDropdown}>
        {type === "three-dots" && <FontAwesomeIcon icon={faEllipsis} className={css["dropdown-icon"]} />}
        {type === "text" && <div>{text}</div>}
        {type === "img" && <img src={imgSrc} />}
      </div>
      {isOpen && (
        <div ref={menuRef} className={css["menu"]}>
          {children}
        </div>
      )}
    </div>
  );
}
