import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiChatNewLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import AddChatModal from "./AddChatModal";
import css from "./chat.module.css";
import { useChatContext } from "./ChatContext";

export default function Header() {
  const { addChat } = useChatContext();
  const navigate = useNavigate();
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
          <div className={css["header__home-btn"]} onClick={() => navigate("/home")}>
            <AiFillHome />
          </div>
        </div>
      </header>
      <Modal open={isAddChatModalOpen} onClose={() => setIsAddChatModalOpen(false)}>
        <AddChatModal onAddChat={handleAddChat} />
      </Modal>
    </>
  );
}
