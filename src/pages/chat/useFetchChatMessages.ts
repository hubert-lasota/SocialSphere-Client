import { useEffect, useState } from "react";
import useChatService from "../../services/useChatService";
import { ChatMessage } from "../../types/chat.types";

export default function useFetchChatMessages(chatId: number | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const chatService = useChatService();

  const findMessages = () => {
    if (!chatId) return;
    setLoading(true);
    chatService
      .findChatMessages(chatId)
      .then((response) => {
        if (response.success) {
          setMessages(response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findMessages();
  }, [chatId]);

  if (!chatId) {
    return { messages, setMessages, loading: false };
  }

  return { messages, setMessages, loading };
}
