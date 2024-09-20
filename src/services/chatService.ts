import { Chat, ChatMessage } from "../types/chat.types";
import { DataResult } from "../types/common.types";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface ChatService {
  createChat: (receiverId: number) => Promise<DataResult<Chat>>;
  findCurrentUserChats: () => Promise<DataResult<Chat[]>>;
  findChatMessages: (chatId: number) => Promise<DataResult<ChatMessage[]>>;
  findCurrentUserChatsWithNewMessages: () => Promise<DataResult<Chat[]>>;
  setSeenAllMessagesInChat: (chatId: number) => Promise<DataResult<any>>;
}

const URL = "http://localhost:8080/api/v1/chat";
const JWT_HEADER: [string, string] = getJwtHeaderFromLocalStorage();
const APPLICATION_JSON_HEADER: [string, string] = ["Content-Type", "application/json"];

function createChat(receiverId: number) {
  return fetchService.post(URL, { receiverId }, undefined, [JWT_HEADER, APPLICATION_JSON_HEADER]);
}

function setSeenAllMessagesInChat(chatId: number) {
  const finalUrl = URL + "/message/seenAll";
  const params: UrlParameter[] = [{key: "chatId", value: chatId.toString()}]

  return fetchService.patch(finalUrl, null, params, [JWT_HEADER]);
}

function findCurrentUserChats() {
  return fetchService.get(URL, undefined, [JWT_HEADER]);
}

function findChatMessages(chatId: number) {
  const finalUrl = URL + "/message";
  const params: UrlParameter[] = [{ key: "chatId", value: chatId.toString() }];

  return fetchService.get(finalUrl, params, [JWT_HEADER]);
}

function findCurrentUserChatsWithNewMessages() {
  const finalUrl = URL + "/message/new";

  return fetchService.get(finalUrl, undefined, [JWT_HEADER]);
}

const chatService: ChatService = {
  createChat,
  findCurrentUserChats,
  findChatMessages,
  findCurrentUserChatsWithNewMessages,
  setSeenAllMessagesInChat,
};

export default chatService;
