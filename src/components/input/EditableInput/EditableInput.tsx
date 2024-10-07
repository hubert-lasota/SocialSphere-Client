import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import styles from "./editable-input.module.css";

type EditableInputProps = {
  initialValue: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputName?: string
  containerStyle?: React.CSSProperties;
  inputContainerStyles?: React.CSSProperties;
  acceptContainerStyle?: React.CSSProperties;
  editContainerStyles?: React.CSSProperties;
};

export default function EditableInput(props: EditableInputProps) {
  const { initialValue, setValue, containerStyle, inputName, inputContainerStyles, acceptContainerStyle, editContainerStyles } = props;
  const [isEditale, setIsEditable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleTurnOnEditMode() {
    setIsEditable(true);
    inputRef.current?.focus();
  }

  function handleAcceptEdit() {
    setIsEditable(false);
  }

  return (
    <div style={containerStyle} className={`${styles["editable"]}`}>
      <span style={inputContainerStyles} className={`${styles["editable__input-container"]}`}>
        <input ref={inputRef} name={inputName} value={initialValue} onChange={setValue} readOnly={!isEditale} className={`${styles["input-container__input"]}`}/>
      </span>
      {isEditale ? (
        <span style={acceptContainerStyle} className={`${styles["editable__accept"]}`} onClick={() => handleAcceptEdit()}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
      ) : (
        <span style={editContainerStyles} className={`${styles["editable__edit"]}`} onClick={() => handleTurnOnEditMode()}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      )}
    </div>
  );
}
