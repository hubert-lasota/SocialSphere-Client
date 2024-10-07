import { UserHeader } from "./user.types";

export interface Chat {
  id: number;
  createdBy: UserHeader;
  createdAt: string;
  user: UserHeader;
  lastMessage: ChatMessage;
  hasNotSeenMessages: boolean
}

export interface ChatMessage {
  id: number;
  chatId: number;
  sender: UserHeader;
  content: string;
  sentAt: string;
}
