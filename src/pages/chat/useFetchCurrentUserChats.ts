import { useEffect, useState } from "react";
import chatService from "../../services/chatService";
import { Chat } from "../../types/chat.types";

export default function useFetchCurrentUserChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const findChats = () => {
    setLoading(true);
    chatService
      .findCurrentUserChats()
      .then((response) => {
        if (response.success) {
          setChats(response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findChats();
  }, []);

  return { chats, setChats, loading };
}
