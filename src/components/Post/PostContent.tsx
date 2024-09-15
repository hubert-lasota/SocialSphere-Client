import { useState } from "react";
import postService from "../../services/postService";
import { FileDetails } from "../../types/common.types";
import fileDetailsToFile from "../../utils/fileDetailsToFile";
import fileToFileDetails from "../../utils/fileToFileDetails";
import Button from "../button/Button";
import FileUploader from "../file_uploader/FileUploader";
import { usePostContext } from "./PostContext";
import PostImage from "./PostImage";
import css from "./post.module.css";

type PostContentProps = {
  isEditModeOn: boolean;
};

export default function PostContent(props: PostContentProps) {
  const { isEditModeOn } = props;
  const { post, cancelUpdatePost, updatePost } = usePostContext();

  const [editableContent, setEditableContent] = useState<string>(post.content);
  const [images, setImages] = useState<FileDetails[] | null>(post.images);

  const getFilesFromImgs = () => {
    return images?.map((img) => fileDetailsToFile(img));
  };

  const handleImagesUpload = (images: File[]) => {
    const fileDetailsPromiseArr = images.map((img) => fileToFileDetails(img, false));
    Promise.all(fileDetailsPromiseArr)
      .then((imgs) => setImages(imgs))
      .catch((err) => console.error(err));
  };

  const handleRemoveImage = (index: number) => {
    const newImgs = images?.splice(index, index);
    if (newImgs) setImages(newImgs);
  };

  const handleCancelUpdatePost = () => {
    cancelUpdatePost();
    setEditableContent(post.content);
  };

  const handleUpdatePost = () => {
    updatePost();
    const imgs = images?.map((img) => fileDetailsToFile(img));
    postService.updatePost(post.id, {
      content: editableContent,
      images: imgs,
    });
  };

  return (
    <>
      {isEditModeOn ? (
        <textarea
          placeholder="Edit post content!"
          className={css["post__content-editable"]}
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />
      ) : (
        <div className={css["post__content"]}>{post.content}</div>
      )}

      {isEditModeOn ? (
        <FileUploader
          onFilesUpload={handleImagesUpload}
          onFileRemove={handleRemoveImage}
          initialFiles={getFilesFromImgs()}
          addFileMessage="Add images to your post!"
        />
      ) : (
        <PostImage />
      )}

      {isEditModeOn && (
        <div className={css["post__editable-btns"]}>
          <Button styleType="secondary" onClick={handleCancelUpdatePost}>
            Cancel
          </Button>
          <Button styleType="primary" onClick={handleUpdatePost}>
            Update
          </Button>
        </div>
      )}
    </>
  );
}
