import { FriendPage, FriendRequestResponse, SearchUsersResponse, UserResponse } from "../types/user.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { ResponseFormat, UrlParameter } from "./fetchService";

interface UserService {
  sendFriendRequest: (receiverId: string) => Promise<FriendRequestResponse>;
  getLoggedInUserProfilePicutreUrl: () => Promise<string>;
  getLoggedInUser: () => Promise<UserResponse>;
  searchUsers: (containsString: string, maxSize: string) => Promise<SearchUsersResponse>;
  findMyFriends: (pageNumber: string, pageSize: string) => Promise<FriendPage>;
  findUser: (userId: string) => Promise<UserResponse>;
  removeFriendFromFriendList: (friendId: string) => Promise<void>
}

const url = "http://localhost:8080/api/v1/user";
const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];

async function sendFriendRequest(receiverId: string): Promise<FriendRequestResponse> {
  const finalUrl = url + "/friend/send";
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const userId = getFromLocalStorage("user_id");
  const body = { senderId: userId, receiverId: receiverId };

  return (await fetchService.post(finalUrl, body, undefined, [
    tokenHeader,
    applicationJsonHeader,
  ])) as Promise<FriendRequestResponse>;
}

async function getLoggedInUserProfilePicutreUrl(): Promise<string> {
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [{ key: "userId", value: userId }];
  const finalUrl = url + "/profile/picture";

  const profilePictureBlob: Blob = await fetchService.get(finalUrl, urlParams, [tokenHeader], ResponseFormat.BLOB);
  return URL.createObjectURL(profilePictureBlob);
}

async function getLoggedInUser(): Promise<UserResponse> {
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const finalUrl = url + `/${userId}`;

  return (await fetchService.get(finalUrl, undefined, [tokenHeader])) as Promise<UserResponse>;
}

async function searchUsers(containsString: string, maxSize: string): Promise<SearchUsersResponse> {
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId },
    { key: "containsString", value: containsString },
    { key: "maxSize", value: maxSize },
  ];
  const finalUrl = url + "/search";
  return (await fetchService.get(finalUrl, urlParams, [tokenHeader])) as Promise<SearchUsersResponse>;
}

async function findMyFriends(pageNumber: string, pageSize: string): Promise<FriendPage> {
  const finalUrl = url + "/friend";
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId },
    { key: "page", value: pageNumber },
    { key: "size", value: pageSize },
  ];
  return (await fetchService.get(finalUrl, urlParams, [tokenHeader])) as Promise<FriendPage>;
}

async function findUser(userId: string): Promise<UserResponse> {
  const finalUrl = url + `/${userId}`;
  const currentUserId = getFromLocalStorage("user_id");
  const urlParams: UrlParameter[] = [{ key: "currentUserId", value: currentUserId }];
  const tokenHeader = getJwtHeaderFromLocalStorage();

  return (await fetchService.get(finalUrl, urlParams, [tokenHeader, applicationJsonHeader])) as Promise<UserResponse>;
}

async function removeFriendFromFriendList(friendId: string): Promise<void> {
  const finalUrl = url + "/friend/remove";
  const userId = getFromLocalStorage("user_id");
  const urlParams: UrlParameter[] = [{key: "userId", value: userId}, {key: "friendId", value: friendId}]
  const tokenHeader = getJwtHeaderFromLocalStorage();

  await fetchService.deleteRequest(finalUrl, urlParams, [tokenHeader]);
}

const userService: UserService = {
  sendFriendRequest: sendFriendRequest,
  getLoggedInUserProfilePicutreUrl: getLoggedInUserProfilePicutreUrl,
  searchUsers: searchUsers,
  findMyFriends: findMyFriends,
  findUser: findUser,
  getLoggedInUser: getLoggedInUser,
  removeFriendFromFriendList: removeFriendFromFriendList
};

export default userService;
