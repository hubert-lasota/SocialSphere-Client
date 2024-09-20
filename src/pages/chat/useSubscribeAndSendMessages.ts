import { CompatClient, IFrame, IMessage, Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ChatMessage } from "../../types/chat.types";

export default function useSubscribeAndSendMessages() {
  const [subscribedMessages, setSubscribedMessages] = useState<ChatMessage[]>([]);
  const [userId] = useLocalStorage("user_id", "");
  const [jwt] = useLocalStorage("jwt", "");
  const stompClientRef = useRef<CompatClient | null>(null);

  const url = `http://localhost:8080/ws?jwt=${jwt}`;
  const webSocket = new SockJS(url);

  useEffect(() => {
    const stompClient = Stomp.over(() => webSocket);
    stompClientRef.current = stompClient;
    stompClient.connect({}, onConnected, (frame: IFrame) => console.log(frame));
    return () => {
      stompClient.disconnect();
    };
  }, []);

  const onConnected = () => {
    stompClientRef.current!.subscribe(`/user/${userId}/queue/messages`, subscribeMessages, {});
    stompClientRef.current!.subscribe(`/user/${userId}/queue/my_messages`, subscribeMessages, {});
  };

  const subscribeMessages = (message: IMessage) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    setSubscribedMessages((prev) => [...prev, chatMessage]);
  };

  const sendMessage = (chatId: number, content: string) => {
    if (stompClientRef.current!.connected) {
      const body = JSON.stringify({ chatId, content });
      stompClientRef.current!.send("/app/chat/message", {}, body);
    } else {
      console.error("STOMP client is not connected. You cannot send message!");
    }
  };

  return { subscribedMessages, sendMessage };
}
