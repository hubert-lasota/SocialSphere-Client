import { DataResult, Page } from "../types/common.types";
import { Friend, FriendRequestResponse, UserHeader, UserProfile, UserProfileConfig, UserWrapper } from "../types/user.types";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface UserService {
  sendFriendRequest: (receiverId: number) => Promise<DataResult<FriendRequestResponse>>;
  getLoggedInUserProfilePicutre: () => Promise<DataResult<string>>;
  getLoggedInUser: () => Promise<DataResult<UserWrapper>>;
  getLoggedInUserHeader: () => Promise<DataResult<UserHeader>>
  searchUsers: (containsString: string, size: number) => Promise<DataResult<UserHeader[]>>;
  findMyFriends: (page: number, size: number) => Promise<DataResult<Page<Friend>>>;
  findMyFriendsWithNoSharedChats: () => Promise<DataResult<Friend[]>>
  findUserFriends: (userId: number, page: number, size: number) => Promise<DataResult<Page<Friend>>>;
  findUser: (userId: number) => Promise<DataResult<UserWrapper>>;
  updateUserProfile: (userProfile: UserProfile) => Promise<DataResult<UserProfile>>;
  updateUserProfileConfig: (useProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
  removeFriendFromFriendList: (friendId: number) => Promise<DataResult<any>>;
}

const URL = "http://localhost:8080/api/v1/user";
const APPLICATION_JSON_HEADER: [string, string] = ["Content-Type", "application/json"];
const JWT_HEADER: [string, string] = getJwtHeaderFromLocalStorage();

function sendFriendRequest(receiverId: number): Promise<DataResult<FriendRequestResponse>> {
  const finalUrl = URL + "/friend/send";
  const body = { receiverId: receiverId.toString() };

  return fetchService.post(finalUrl, body, undefined, [JWT_HEADER, APPLICATION_JSON_HEADER]) as Promise<DataResult<FriendRequestResponse>>;
}

function getLoggedInUserProfilePicutre(): Promise<DataResult<string>> {
  const finalUrl = URL + "/profile/picture";

  return fetchService.get(finalUrl, undefined, [JWT_HEADER]);
}

function getLoggedInUser(): Promise<DataResult<UserWrapper>> {
  return fetchService.get(URL, undefined, [JWT_HEADER]) as Promise<DataResult<UserWrapper>>;
}

function getLoggedInUserHeader() {
  const params: UrlParameter[] = [{
    key: "header", value: "true"
  }]

  return fetchService.get(URL, params, [JWT_HEADER]) as Promise<DataResult<UserHeader>>;
}

function searchUsers(containsString: string, size: number): Promise<DataResult<UserHeader[]>> {
  const urlParams: UrlParameter[] = [
    { key: "containsString", value: containsString },
    { key: "size", value: size.toString() },
  ];
  const finalUrl = URL + "/search";
  return fetchService.get(finalUrl, urlParams, [JWT_HEADER]) as Promise<DataResult<UserHeader[]>>;
}

function findMyFriends(page: number, size: number): Promise<DataResult<Page<Friend>>> {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams, [JWT_HEADER]) as Promise<DataResult<Page<Friend>>>;
}

function findMyFriendsWithNoSharedChats() {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "noSharedChat", value: "true"}
  ]

  return fetchService.get(finalUrl, urlParams, [JWT_HEADER]);
}

function findUserFriends(userId: number, page: number, size: number): Promise<DataResult<Page<Friend>>> {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId.toString() },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams, [JWT_HEADER]) as Promise<DataResult<Page<Friend>>>;
}

function findUser(userId: number): Promise<DataResult<UserWrapper>> {
  const finalUrl = URL + `/${userId}`;

  return fetchService.get(finalUrl, undefined, [JWT_HEADER, APPLICATION_JSON_HEADER]) as Promise<DataResult<UserWrapper>>;
}

function updateUserProfile(userProfile: UserProfile): Promise<DataResult<UserProfile>> {
  const { firstName, lastName, city, country, profilePicture } = userProfile;
  const finalUrl = URL + "/profile";

  const formData = new FormData();
  if (profilePicture) {
    const blobProfilePicture = new Blob([profilePicture], { type: "image/jpeg" });
    formData.append("profilePicture", blobProfilePicture, "profile.jpg");
  }

  const userProfileRequest = { firstName, lastName, city, country };
  const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
  formData.append("request", requestBlob);

  return fetchService.put(finalUrl, formData, undefined, [JWT_HEADER]) as Promise<DataResult<UserProfile>>;
}

function updateUserProfileConfig(userProfileConfig: UserProfileConfig): Promise<DataResult<UserProfileConfig>> {
  const finalUrl = URL + "/profile/config";

  return fetchService.put(finalUrl, userProfileConfig, undefined, [APPLICATION_JSON_HEADER, JWT_HEADER]) as Promise<DataResult<UserProfileConfig>>;
}

function removeFriendFromFriendList(friendId: number): Promise<DataResult<any>> {
  const finalUrl = URL + "/friend/remove";
  const urlParams: UrlParameter[] = [{ key: "friendId", value: friendId.toString() }];

  return fetchService.deleteRequest(finalUrl, urlParams, [JWT_HEADER]);
}

const userService: UserService = {
  sendFriendRequest: sendFriendRequest,
  getLoggedInUserProfilePicutre: getLoggedInUserProfilePicutre,
  getLoggedInUserHeader: getLoggedInUserHeader,
  searchUsers: searchUsers,
  findMyFriends: findMyFriends,
  findMyFriendsWithNoSharedChats,
  findUserFriends: findUserFriends,
  findUser: findUser,
  getLoggedInUser: getLoggedInUser,
  updateUserProfile: updateUserProfile,
  updateUserProfileConfig: updateUserProfileConfig,
  removeFriendFromFriendList: removeFriendFromFriendList,
};

export default userService;
