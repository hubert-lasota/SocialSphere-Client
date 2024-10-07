import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import usePostService from "../../../services/usePostService";
import { PostComment as IPostComment } from "../../../types/post.types";
import base64ToImgSrc from "../../../utils/base64ToImgSrc";
import getDateDifference from "../../../utils/getDateDifference";
import getDefaultUserProfilePictureSrc from "../../../utils/getDefaultUserProfilePictureSrc";
import Button from "../../button/Button";
import css from "../post.module.css";
import PostCommentAuthorButton from "./PostCommentAuthorButton";

type PostCommentProps = {
  comment: IPostComment;
  postId: number;
  onDelete: (postCommentId: number) => void;
};

export default function PostComment(props: PostCommentProps) {
  const { comment, postId, onDelete } = props;
  const { id, content: initialContent, authorId, authorProfile, createdAt } = comment;
  const { profilePicture, firstName, lastName } = authorProfile;
  const postService = usePostService();
  const [currentUserId] = useLocalStorage("user_id", "");

  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initialContent);
  const [editableContent, setEditableContent] = useState<string>(content);

  const isCurrentUserPostCommentAuthor = currentUserId === authorId;
  const isPostCommentAuthorBtnShown = useRef<boolean>(isCurrentUserPostCommentAuthor);

  const navigate = useNavigate();

  const getProfileImgSrc = () => {
    if (profilePicture) {
      return base64ToImgSrc(profilePicture);
    } else {
      return getDefaultUserProfilePictureSrc();
    }
  };

  const handleNavigateToUserProfile = () => {
    if (currentUserId === authorId) {
      navigate("/me");
    } else {
      navigate(`/user/${authorId}`);
    }
  };

  const handleOpenEditMode = () => {
    isPostCommentAuthorBtnShown.current = false;
    setIsEditModeOn(true);
  };

  const cancelUpdate = () => {
    isPostCommentAuthorBtnShown.current = isCurrentUserPostCommentAuthor;
    setContent(initialContent);
    setIsEditModeOn(false);
  };

  const handleDeletePostComment = async () => {
    await onDelete(id);
  };

  const updateComment = async () => {
    const response = await postService.updatePostComment(comment.id, postId, editableContent);
    if (response.success) {
      setContent(editableContent);
    }
    isPostCommentAuthorBtnShown.current = isCurrentUserPostCommentAuthor;
    setIsEditModeOn(false);
  };

  return (
    <div className={css["post__comment"]}>
      <div className={css["comment__left-side"]}>
        <img src={getProfileImgSrc()} alt="profile" className={css["left-side__profile"]} onClick={handleNavigateToUserProfile} />
      </div>
      <div className={css["comment__right-side"]}>
        <div className={css["right-side__user-details"]}>
          <div>
            <div className={css["user-details__name"]}>
              <span>{firstName}</span>
              <span>{lastName}</span>
            </div>
            <div className={css["user-details__date"]}>{getDateDifference(new Date(createdAt))}</div>
          </div>
        </div>
        {isEditModeOn ? (
          <textarea
            className={css["right-side__content-editable"]}
            placeholder="What do you think about this post?"
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
          />
        ) : (
          <div className={css["right-side__content"]}>{content}</div>
        )}
        {isEditModeOn && (
          <div className={css["right-side__editable-btns"]}>
            <Button styleType="secondary" onClick={cancelUpdate}>
              Cancel
            </Button>
            <Button styleType="primary" onClick={updateComment}>
              Update
            </Button>
          </div>
        )}
      </div>
      <div>{isPostCommentAuthorBtnShown.current && <PostCommentAuthorButton onEdit={handleOpenEditMode} onDelete={handleDeletePostComment} />}</div>
    </div>
  );
}
