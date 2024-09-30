import { DataResult, Page } from "../types/common.types";
import {
  FriendRequestResponse,
  UserHeader,
  UserProfile,
  UserProfileConfig,
  UserProfileRequest,
  UserWithProfile,
  UserWrapper,
} from "../types/user.types";
import base64ToUint8Array from "../utils/base64ToUint8Array";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface UserService {
  createProfile: (userProfileRequest: UserProfileRequest, profilePicture: File | null) => Promise<DataResult<UserProfile>>;
  createProfileConfig: (UserProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
  sendFriendRequest: (receiverId: number) => Promise<DataResult<FriendRequestResponse>>;
  acceptFriendRequest: (friendRequestId: number) => Promise<DataResult<any>>;
  rejectFriendRequest: (friendRequestId: number) => Promise<DataResult<any>>;
  getLoggedInUserProfilePicutre: () => Promise<DataResult<string>>;
  getLoggedInUser: () => Promise<DataResult<UserWrapper>>;
  getLoggedInUserHeader: () => Promise<DataResult<UserHeader>>;
  searchUsers: (pattern: string, size: number) => Promise<DataResult<UserHeader[]>>;
  findMyFriends: (page: number, size: number) => Promise<DataResult<Page<UserWithProfile>>>;
  findMyFriendsWithNoSharedChats: () => Promise<DataResult<UserWithProfile[]>>;
  findUserFriends: (userId: number, page: number, size: number) => Promise<DataResult<Page<UserWithProfile>>>;
  findUser: (userId: number) => Promise<DataResult<UserWrapper>>;
  findCurrentUserFriendNotifications: () => Promise<DataResult<FriendRequestResponse[]>>;
  findUserFriendRequestForCurrentUser: (userId: number) => Promise<DataResult<FriendRequestResponse>>;
  updateUserProfile: (userProfile: UserProfile) => Promise<DataResult<UserProfile>>;
  updateUserProfileConfig: (useProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
  removeFriendFromFriendList: (friendId: number) => Promise<DataResult<any>>;
  isCurrentUserWaitingForFriendResponse: (userId: number) => Promise<DataResult<boolean>>;
  isCurrentUserHasPermissionToCheckProfile: (userId: number) => Promise<DataResult<boolean>>;
  isUserWaitingForCurrentUserFriendResponse: (userId: number) => Promise<DataResult<boolean>>;
}

const URL = "http://localhost:8080/api/v1/user";
const JWT_HEADER: [string, string] = getJwtHeaderFromLocalStorage();

function createProfile(userProfileRequest: UserProfileRequest, profilePicture: File | null) {
  const formData = new FormData();
  if (profilePicture) {
    formData.append("profilePicture", profilePicture, profilePicture.name);
  }

  const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
  formData.append("request", requestBlob);

  const finalUrl = URL + "/profile";
  return fetchService.post(finalUrl, formData, undefined, [JWT_HEADER]);
}

function createProfileConfig(userProfileConfig: UserProfileConfig) {
  const finalUrl = URL + "/profile/config";

  return fetchService.post(finalUrl, userProfileConfig);
}

function acceptFriendRequest(friendRequestId: number) {
  const finalUrl = URL + "/friend/accept";
  const params: UrlParameter[] = [{ key: "friendRequestId", value: friendRequestId.toString() }];

  return fetchService.patch(finalUrl, undefined, params);
}

function rejectFriendRequest(friendRequestId: number) {
  const finalUrl = URL + "/friend/reject";
  const params: UrlParameter[] = [{ key: "friendRequestId", value: friendRequestId.toString() }];

  return fetchService.patch(finalUrl, undefined, params);
}

function sendFriendRequest(receiverId: number): Promise<DataResult<FriendRequestResponse>> {
  const finalUrl = URL + "/friend/send";
  const body = { receiverId: receiverId.toString() };

  return fetchService.post(finalUrl, body) as Promise<DataResult<FriendRequestResponse>>;
}

function getLoggedInUserProfilePicutre(): Promise<DataResult<string>> {
  const finalUrl = URL + "/profile/picture";

  return fetchService.get(finalUrl);
}

function getLoggedInUser(): Promise<DataResult<UserWrapper>> {
  return fetchService.get(URL) as Promise<DataResult<UserWrapper>>;
}

function getLoggedInUserHeader() {
  const params: UrlParameter[] = [
    {
      key: "header",
      value: "true",
    },
  ];

  return fetchService.get(URL, params) as Promise<DataResult<UserHeader>>;
}

function searchUsers(pattern: string, size: number): Promise<DataResult<UserHeader[]>> {
  const urlParams: UrlParameter[] = [
    { key: "pattern", value: pattern },
    { key: "size", value: size.toString() },
  ];
  const finalUrl = URL + "/search";
  return fetchService.get(finalUrl, urlParams) as Promise<DataResult<UserHeader[]>>;
}

function findMyFriends(page: number, size: number): Promise<DataResult<Page<UserWithProfile>>> {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams) as Promise<DataResult<Page<UserWithProfile>>>;
}

function findMyFriendsWithNoSharedChats() {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [{ key: "noSharedChat", value: "true" }];

  return fetchService.get(finalUrl, urlParams);
}

function findUserFriends(userId: number, page: number, size: number): Promise<DataResult<Page<UserWithProfile>>> {
  const finalUrl = URL + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId.toString() },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams) as Promise<DataResult<Page<UserWithProfile>>>;
}

function findUser(userId: number): Promise<DataResult<UserWrapper>> {
  const finalUrl = URL + `/${userId}`;

  return fetchService.get(finalUrl) as Promise<DataResult<UserWrapper>>;
}

function findCurrentUserFriendNotifications() {
  const finalUrl = URL + "/friend/notification";

  return fetchService.get(finalUrl);
}

function findUserFriendRequestForCurrentUser(userId: number) {
  const finalUrl = URL + "/friend/request/toCurrentUser";
  const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

  return fetchService.get(finalUrl, params);
}

function updateUserProfile(userProfile: UserProfile): Promise<DataResult<UserProfile>> {
  const { firstName, lastName, city, country, profilePicture } = userProfile;
  const finalUrl = URL + "/profile";

  const formData = new FormData();
  if (profilePicture) {
    const u8intarr: Uint8Array = base64ToUint8Array(profilePicture);
    const blobProfilePicture = new Blob([u8intarr], { type: "image/jpeg" });
    formData.append("profilePicture", blobProfilePicture, "profile.jpg");
  }

  const userProfileRequest = { firstName, lastName, city, country };
  const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
  formData.append("request", requestBlob);

  return fetchService.put(finalUrl, formData, undefined, [JWT_HEADER]) as Promise<DataResult<UserProfile>>;
}

function updateUserProfileConfig(userProfileConfig: UserProfileConfig): Promise<DataResult<UserProfileConfig>> {
  const finalUrl = URL + "/profile/config";

  return fetchService.put(finalUrl, userProfileConfig) as Promise<DataResult<UserProfileConfig>>;
}

function removeFriendFromFriendList(friendId: number): Promise<DataResult<any>> {
  const finalUrl = URL + "/friend/remove";
  const urlParams: UrlParameter[] = [{ key: "friendId", value: friendId.toString() }];

  return fetchService.deleteRequest(finalUrl, urlParams);
}

function isCurrentUserWaitingForFriendResponse(userId: number) {
  const finalUrl = URL + "/friend/isCurrentUserWaiting";
  const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

  return fetchService.get(finalUrl, params);
}

function isCurrentUserHasPermissionToCheckProfile(userId: number) {
  const finalUrl = URL + "/isAllowed";
  const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

  return fetchService.get(finalUrl, params);
}

function isUserWaitingForCurrentUserFriendResponse(userId: number) {
  const finalUrl = URL + "/friend/isUserWaiting";
  const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

  return fetchService.get(finalUrl, params);
}

const userService: UserService = {
  createProfile,
  createProfileConfig,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  getLoggedInUserProfilePicutre,
  getLoggedInUserHeader,
  searchUsers,
  findMyFriends,
  findMyFriendsWithNoSharedChats,
  findUserFriends,
  findUser,
  findCurrentUserFriendNotifications,
  findUserFriendRequestForCurrentUser,
  getLoggedInUser,
  updateUserProfile,
  updateUserProfileConfig,
  removeFriendFromFriendList,
  isCurrentUserWaitingForFriendResponse,
  isCurrentUserHasPermissionToCheckProfile,
  isUserWaitingForCurrentUserFriendResponse,
};

export default userService;
