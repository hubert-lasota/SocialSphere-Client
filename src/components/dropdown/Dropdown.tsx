import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import useFetchCurrentUserProfilePicture from "../../hooks/useFetchCurrentUserProfilePicture";
import Loading from "../loading/Loading";
import css from "./dropdown.module.css";

type DropdownProps = {
  header: ReactNode;
  children: ReactNode;
  additionalClassName?: string;
  additionalStyle?: CSSProperties;
  additionalHeaderContainerStyle?: CSSProperties;
  additionalMenuContainerStyle?: CSSProperties;
};

export default function Dropdown(props: DropdownProps) {
  const { header, children, additionalClassName, additionalStyle, additionalHeaderContainerStyle, additionalMenuContainerStyle } = props;
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
    <div ref={dropdownRef} style={additionalStyle} className={css["dropdown"] + " " + additionalClassName}>
      <div className={css["dropdown__menu-btn"]} style={additionalHeaderContainerStyle} onClick={clickDropdown}>
        {header}
      </div>
      {isOpen && (
        <div ref={menuRef} style={additionalMenuContainerStyle} className={css["menu"]}>
          {children}
        </div>
      )}
    </div>
  );
}

Dropdown.HeaderThreeDots = function DropdownHeaderThreeDots() {
  return <FontAwesomeIcon icon={faEllipsis} className={css["dropdown-icon"]} />;
};

Dropdown.HeaderUserProfileImg = function DropdownHeaderUserProfileImg() {
  const { picture, loading } = useFetchCurrentUserProfilePicture();

  if (loading) {
    return <Loading />;
  }

  return <img src={picture} className="profile-picture" alt="profile" />;
};
