import { useEffect, useState } from "react";
import chatService from "../../services/chatService";
import { Chat } from "../../types/chat.types";

export default function useFetchChatsWithNewMessages() {
  const [chatsWithNewMessages, setChatsWithNewMessages] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatIds = () => {
    setLoading(true);
    chatService
      .findCurrentUserChatsWithNewMessages()
      .then((response) => {
        if (response.success) {
          setChatsWithNewMessages(response.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChatIds();
  }, []);

  return { chatsWithNewMessages, setChatsWithNewMessages, loading };
}
