import { useState } from "react";
import useFetchCurrentUserProfilePicture from "../../hooks/useFetchCurrentUserProfilePicture";
import Button from "../button/Button";
import css from "./post.module.css";

type AddPostCommentProps = {
  onAddPostComment: (content: string) => Promise<void>;
};

export default function AddPostComment(props: AddPostCommentProps) {
  const { onAddPostComment } = props;
  const { picture } = useFetchCurrentUserProfilePicture();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const handleChangeValue = (value: string) => {
    setContent(value);
  };

  const handleClickNonEditable = () => {
    setIsEditable(true);
  };

  const handleCancelAddPostComment = () => {
    setContent("");
    setIsEditable(false);
  };

  const handleAddPostComment = async () => {
    await onAddPostComment(content);
    setContent("")
    setIsEditable(false);
  };

  return (
    <div className={css["comment__add-comment"]}>
      <img src={picture} alt="profile" className={css["add-comment__profile"]} />
      {isEditable ? (
        <div className={css["add-comment__editable"]}>
          <textarea
            className={css["add-comment__editable__text-area"]}
            value={content}
            onChange={(e) => handleChangeValue(e.target.value)}
            placeholder="What do you think about this post?"
          />
          <div className={css["add-comment__editable__btn-wrapper"]}>
            <Button styleType={"secondary"} additionalStyle={css["add-comment__editable__btn"]} onClick={handleCancelAddPostComment}>
              Cancel
            </Button>
            <Button styleType={"primary"} additionalStyle={css["add-comment__editable__btn"]} onClick={handleAddPostComment}>
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div className={css["add-comment__non-editable"]} onClick={handleClickNonEditable}>
          Click to comment this post!
        </div>
      )}
    </div>
  );
}
