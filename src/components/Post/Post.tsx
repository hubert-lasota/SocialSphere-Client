import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePostContext } from "../../contexts/PostContext";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import postService from "../../services/postService";
import { FileDetails } from "../../types/common.types";
import { Post as IPost } from "../../types/post.types";
import base64ToImgSrc from "../../utils/base64ToImgSrc";
import fileDetailsToFile from "../../utils/fileDetailsToFile";
import fileToFileDetails from "../../utils/fileToFileDetails";
import getDateDifference from "../../utils/getDateDifference";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import Button from "../button/Button";
import FileUploader from "../file_uploader/FileUploader";
import ImageSlider from "../image_slider/ImageSlider";
import AddPostComment from "./AddPostComment";
import css from "./post.module.css";
import PostComment from "./PostComment";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useFetchPostComments from "./useFetchPostComments";

type PostProps = {
  post: IPost;
};

export default function Post(props: PostProps) {
  const { post } = props;
  const { firstName, lastName, profilePicture } = post.userProfile;
  const { id, userId, content: initialContent, images: initialImages, isLiked, likeCount, commentCount, createdAt } = post;
  const { onDeletePost } = usePostContext();
  const { comments, setComments, last, fetchNextCommentPage } = useFetchPostComments(id);
  const navigateToUserProfile = useNavigateToUserProfile();
  const isCurrentUserPostAuthor = useIsCurrentUser(userId);

  const [content, setContent] = useState<string>(initialContent);
  const [images, setImages] = useState<FileDetails[] | null>(initialImages);
  const [isPostLiked, setIsPostLiked] = useState<boolean>(isLiked);
  const [isImgSliderOpen, setIsImgSliderOpen] = useState<boolean>(false);
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [areCommentsOpen, setAreCommentsOpen] = useState<boolean>(false);

  const [editableContent, setEditableContent] = useState<string>(content);
  const [editableImages, setEditableImages] = useState<FileDetails[] | null>(images);

  const isPostAuthorBtnShown = useRef<boolean>(isCurrentUserPostAuthor);
  const likesSum = useRef<number>(likeCount);
  const commentsSum = useRef<number>(commentCount);
  const imgSliderInitialIndex = useRef<number>(0);
  const imgSliderUrls = useRef<string[]>([]);

  const handleAddLike = async () => {
    const response = await postService.addLikeToPost(id);
    if (response.success) {
      likesSum.current++;
      setIsPostLiked(true);
    }
  };

  const handleRemoveLike = async () => {
    const response = await postService.removeLikeFromPost(id);
    if (response.success) {
      likesSum.current--;
      setIsPostLiked(false);
    }
  };

  const handleClickComments = () => {
    setAreCommentsOpen((prev) => !prev);
  };

  const handleAddPostComment = async (content: string) => {
    const response = await postService.createPostComment(id, content);
    if (response.success) {
      commentsSum.current++;
      const comment = response.data;
      setComments((prev) => [comment, ...prev]);
    }
  };

  const handleOpenEditMode = () => {
    isPostAuthorBtnShown.current = false;
    setIsEditModeOn(true);
  };

  const handleImagesUpload = (images: File[]) => {
    const fileDetailsPromiseArr = images.map((img) => fileToFileDetails(img, false));
    Promise.all(fileDetailsPromiseArr)
      .then((imgs) => setEditableImages(imgs))
      .catch((err) => console.error(err));
  };

  const handleRemoveImage = (index: number) => {
    const newImgs = editableImages?.splice(index, index);
    if (newImgs) setImages(newImgs);
  };

  const handleCancelUpdate = () => {
    isPostAuthorBtnShown.current = isCurrentUserPostAuthor;
    setIsEditModeOn(false);
    setEditableImages(images);
    setEditableContent(content);
  };

  const handleUpdatePost = async () => {
    const files = editableImages?.map((img) => fileDetailsToFile(img));
    const response = await postService.updatePost(id, { content: editableContent, images: files });
    if (response.success) {
      setContent(editableContent);
      setImages(editableImages);
    }
    isPostAuthorBtnShown.current = isCurrentUserPostAuthor;
    setIsEditModeOn(false);
  };

  const handleDeletePost = () => {
    onDeletePost(id);
  };

  const handleDeletePostComment = async (postCommentId: number) => {
    const response = await postService.deletePostComment(postCommentId);
    if (response.success) {
      const coms = comments.filter((c) => c.id !== postCommentId);
      setComments(coms);
      commentsSum.current--;
    }
  };

  const handleOpenImageSlider = (imgUrls: string[], imgIndex: number) => {
    imgSliderInitialIndex.current = imgIndex;
    imgSliderUrls.current = imgUrls;
    setIsImgSliderOpen(true);
  };

  const handleCloseImageSlider = () => {
    setIsImgSliderOpen(false);
  };

  if (isImgSliderOpen) {
    return createPortal(
      <ImageSlider imageUrls={imgSliderUrls.current} imageInitialIndex={imgSliderInitialIndex.current} onCloseImageSlider={handleCloseImageSlider} />,
      document.getElementById("portal")!
    );
  }

  const getFilesFromImgs = () => {
    return editableImages?.map((img) => fileDetailsToFile(img));
  };

  return (
    <div className={css["post"]}>
      <PostHeader
        profileImgSrc={getUserProfileImgSrc(profilePicture)}
        onClickProfileImg={() => navigateToUserProfile(userId)}
        firstName={firstName}
        lastName={lastName}
        isCurrentUserPostAutor={isPostAuthorBtnShown.current}
        onEdit={handleOpenEditMode}
        onDelete={handleDeletePost}
        dateDiff={getDateDifference(new Date(createdAt))}
      />
      {isEditModeOn ? (
        <textarea
          placeholder="Edit post content!"
          className={css["post__content-editable"]}
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />
      ) : (
        <div className={css["post__content"]}>{content}</div>
      )}

      {isEditModeOn ? (
        <FileUploader
          onFilesUpload={handleImagesUpload}
          onFileRemove={handleRemoveImage}
          initialFiles={getFilesFromImgs()}
          addFileMessage="Add images to your post!"
        />
      ) : (
        createImageComponent(images, handleOpenImageSlider)
      )}
      {isEditModeOn ? (
        <div className={css["post__editable-btns"]}>
          <Button styleType="secondary" onClick={handleCancelUpdate}>
            Cancel
          </Button>
          <Button styleType="primary" onClick={handleUpdatePost}>
            Update
          </Button>
        </div>
      ) : (
        <PostFooter
          isPostLiked={isPostLiked}
          likesSum={likesSum.current}
          commentsSum={commentsSum.current}
          onAddLike={handleAddLike}
          onRemoveLike={handleRemoveLike}
          onClickComments={handleClickComments}
        />
      )}
      {areCommentsOpen && (
        <>
          <AddPostComment onAddPostComment={handleAddPostComment} />
          {comments.length > 0 &&
            comments.map((comment) => {
              return <PostComment comment={comment} postId={id} onDelete={handleDeletePostComment} key={comment.id}/>;
            })}
          {!last && (
            <div className={css["comment__show-more-btn"]} onClick={fetchNextCommentPage}>
              <span>Show more comments</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const createImageComponent = (
  images: FileDetails[] | null,
  onOpenImageSlider: (imgUrls: string[], imageInitialIndex: number) => void
): JSX.Element => {
  if (!images || images.length === 0) {
    return <></>;
  }
  const imgUrls = images.map((img) => base64ToImgSrc(img.content));

  const imgLength = imgUrls.length;

  const ImgWrapper = (props: { children: React.ReactNode }) => {
    return <div className={css["post__images"]}>{props.children}</div>;
  };

  const RowOfTwoImgs = (props: { imgSrcOne: string; imgSrcTwo: string; indexOne: number; indexTwo: number }) => {
    const { imgSrcOne, imgSrcTwo, indexOne, indexTwo } = props;
    return (
      <div className={css["post__images__row"]}>
        <img src={imgSrcOne} className={css["post__images__double"]} onClick={() => onOpenImageSlider(imgUrls, indexOne)} />
        <img src={imgSrcTwo} className={css["post__images__double"]} onClick={() => onOpenImageSlider(imgUrls, indexTwo)} />
      </div>
    );
  };

  const RowOfSingleImg = (props: { imgSrc: string; index: number }) => {
    return (
      <div className={css["post__images__row"]}>
        <img src={props.imgSrc} className={css["post__images__single"]} onClick={() => onOpenImageSlider(imgUrls, props.index)} />
      </div>
    );
  };

  if (imgLength > 4) {
    const sizeOfMoreImgs = imgLength - 3;

    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <div className={css["post__images__row"]}>
          <img src={imgUrls[2]} className={css["post__images__double"]} onClick={() => onOpenImageSlider(imgUrls, 2)} />
          <div className={css["post__images__more-photos"]} onClick={() => onOpenImageSlider(imgUrls, 3)}>
            Click to see {sizeOfMoreImgs} more photos.
          </div>
        </div>
      </ImgWrapper>
    );
  }

  if (imgLength === 4) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <RowOfTwoImgs imgSrcOne={imgUrls[2]} imgSrcTwo={imgUrls[3]} indexOne={2} indexTwo={3} />
      </ImgWrapper>
    );
  }

  if (imgLength === 3) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
        <RowOfSingleImg imgSrc={imgUrls[2]} index={2} />
      </ImgWrapper>
    );
  }

  if (imgLength === 2) {
    return (
      <ImgWrapper>
        <RowOfTwoImgs imgSrcOne={imgUrls[0]} imgSrcTwo={imgUrls[1]} indexOne={0} indexTwo={1} />
      </ImgWrapper>
    );
  }

  if (imgLength === 1) {
    return (
      <ImgWrapper>
        <img src={imgUrls[0]} onClick={() => onOpenImageSlider(imgUrls, 0)} className={css["post__images__single"]} />
      </ImgWrapper>
    );
  }

  return <></>;
};
