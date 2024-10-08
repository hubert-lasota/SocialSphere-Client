import { CSSProperties, ReactNode, useState } from "react";
import { PiCaretDown } from "react-icons/pi";
import css from "./dropdown.module.css";

type SelectDropdownProps = {
  header: ReactNode;
  items: ReactNode;
  additionalStyle?: CSSProperties;
};

export default function SelectDropdown(props: SelectDropdownProps) {
  const { header, items, additionalStyle } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <div className={css["select-dropdown"]} style={additionalStyle}>
      <div className={css["select-dropdown__header"]} onClick={() => setIsClicked((prev) => !prev)}>
        {header}
        <div className={css["select-dropdown__header__icon"]}><PiCaretDown /></div>
      </div>
      {isClicked && (
        <div className={css["select-dropdown__menu"]} onClick={() => setIsClicked(false)}>
          {items}
        </div>
      )}
    </div>
  );
}
