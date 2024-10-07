import { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import HomeNavigateButton from "../../components/button/HomeNavigateButton";
import Modal from "../../components/modal/Modal";
import AddChatModal from "./AddChatModal";
import css from "./chat.module.css";
import { useChatContext } from "./ChatContext";

export default function Header() {
  const { addChat } = useChatContext();
  const [isAddChatModalOpen, setIsAddChatModalOpen] = useState<boolean>(false);

  const handleAddChat = (receiverId: number) => {
    setIsAddChatModalOpen(false);
    addChat(receiverId);
  };

  return (
    <>
      <header className={css["header"]}>
        <div className={css["header-container"]}>
          <div className={css["header__add-chat-btn"]} onClick={() => setIsAddChatModalOpen(true)}>
            <RiChatNewLine />
          </div>
          <HomeNavigateButton additionalClassName={css["header__home-btn"]} />
        </div>
      </header>
      <Modal open={isAddChatModalOpen} onClose={() => setIsAddChatModalOpen(false)}>
        <AddChatModal onAddChat={handleAddChat} />
      </Modal>
    </>
  );
}
