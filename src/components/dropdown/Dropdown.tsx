import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import css from "./dropdown.module.css";

type DropdownProps = {
  children: React.ReactNode;
  type?: "three-dots" | "text";
  text?: string;
  additionalClassName?: string;
};

export default function Dropdown(props: DropdownProps) {
  const { children, type = "three-dots", text, additionalClassName } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!menuRef.current) return;
    const handleClickMenuItem = (e: MouseEvent) => {
      if(menuRef.current!.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    menuRef.current.onclick = handleClickMenuItem;
  }, []);

  const clickDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className={css["dropdown"] + " " + additionalClassName}>
      <div className={css["dropdown__menu-btn"]} onClick={clickDropdown}>
        {type === "three-dots" && <FontAwesomeIcon icon={faEllipsis} className={css["dropdown-icon"]}/>}
        {type === "text" && <div>{text}</div>}
      </div>
      {isOpen && <div ref={menuRef} className={css["menu"]}>{children}</div>}
    </div>
  );
}
