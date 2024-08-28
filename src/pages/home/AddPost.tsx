import { useState } from "react";
import Modal from "../../components/modal/Modal";
import "../../css/global.css";
import AddPostModal from "./AddPostModal";
import css from "./home.module.css";
import useFetchCurrentUserProfilePicture from "../../hooks/useFetchCurrentUserProfilePicture";
export default function AddPost() {
  const { picture } = useFetchCurrentUserProfilePicture();
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);

  const handleRejectAddPost = () => {
    setIsOpenModal(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className={css["add-post"]} onClick={handleOpenModal}>
        <div className={css["add-post__left-side"]}>
          <img src={picture} alt="profile" className={css["add-post__left-side__profile"]} />
        </div>
        <div className={css["add-post__right-side"]}>Whats on your mind today?</div>
      </div>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <AddPostModal onCloseModal={handleCloseModal} onRejectAddPost={handleRejectAddPost} />
        </Modal>
      )}
    </>
  );
}
