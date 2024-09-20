import { useState } from "react";
import Button from "../../components/button/Button";
import FileUploader from "../../components/file_uploader/FileUploader";
import { useManagePostsContext } from "../../contexts/ManagePostsContext";
import "../../css/global.css";
import useFetchCurrentUserProfilePicture from "../../hooks/useFetchCurrentUserProfilePicture";
import { PostRequest } from "../../types/post.types";
import isStringBlank from "../../utils/isStringBlank";
import css from "./home.module.css";

type AddPostModalProps = {
  onCloseModal: () => void;
  onRejectAddPost: () => void;
};

export default function AddPostModal(props: AddPostModalProps) {
  const { onCloseModal, onRejectAddPost } = props;
  const { onAddPost } = useManagePostsContext();
  const { picture } = useFetchCurrentUserProfilePicture();

  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");

  const handleFileUpload = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveUploadedFile = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addPost = () => {
    if (isStringBlank(content)) {
      window.alert("You need to add content to your post!");
      return;
    }
    const post: PostRequest = { content, images };
    onAddPost(post);
    onCloseModal();
  };

  return (
    <div className={css["add-post-modal"]}>
      <header className={css["add-post-modal__header"]}>Create Post</header>
      <main className={css["add-post-modal__main"]}>
        <div className={css["add-post-modal__main__left-side"]}>
          <img src={picture} alt="profile" className={css["add-post-modal__main__left-side__profile"]} />
        </div>
        <div className={css["add-post-modal__main__left-side"]}>
          <textarea
            rows={11}
            cols={27}
            className={css["add-post-modal__main__right-side__text-area"]}
            placeholder="Whats on your mind today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </main>
      <footer className={css["add-post-modal__footer"]}>
        <div className={css["add-post-modal__footer__top"]}>
          <FileUploader onFilesUpload={handleFileUpload} onFileRemove={handleRemoveUploadedFile} addFileMessage="Add images to your post!" />
        </div>
        <div className={css["add-post-modal__footer__bottom"]}>
          <Button styleType="secondary" onClick={onRejectAddPost} additionalStyle={css["add-post-modal__footer__bottom__btn"]}>
            Cancel
          </Button>
          <Button styleType="primary" onClick={addPost} additionalStyle={css["add-post-modal__footer__bottom__btn"]}>
            Create
          </Button>
        </div>
      </footer>
    </div>
  );
}
