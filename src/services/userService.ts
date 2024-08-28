import { DataResult, Page } from "../types/common.types";
import { Friend, FriendRequestResponse, UserHeader, UserProfile, UserProfileConfig, UserWrapper } from "../types/user.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface UserService {
  sendFriendRequest: (receiverId: string) => Promise<DataResult<FriendRequestResponse>>;
  getLoggedInUserProfilePicutre: () => Promise<DataResult<string>>;
  getLoggedInUser: () => Promise<DataResult<UserWrapper>>;
  searchUsers: (containsString: string, maxSize: string) => Promise<DataResult<UserHeader[]>>;
  findMyFriends: (pageNumber: string, pageSize: string) => Promise<DataResult<Page<Friend>>>;
  findUserFriends: (userId: string, pageNumber: string, pageSize: string) => Promise<DataResult<Page<Friend>>>;
  findUser: (userId: string) => Promise<DataResult<UserWrapper>>;
  updateUserProfile: (userProfile: UserProfile) => Promise<DataResult<UserProfile>>;
  updateUserProfileConfig: (useProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
  removeFriendFromFriendList: (friendId: string) => Promise<void>;
}

const url = "http://localhost:8080/api/v1/user";
const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];
const jwtHeader: [string, string] = getJwtHeaderFromLocalStorage();
const currentUserId = getFromLocalStorage("user_id");

async function sendFriendRequest(receiverId: string): Promise<DataResult<FriendRequestResponse>> {
  const finalUrl = url + "/friend/send";
  const body = { senderId: currentUserId, receiverId: receiverId };

  return (await fetchService.post(finalUrl, body, undefined, [jwtHeader, applicationJsonHeader])) as Promise<
    DataResult<FriendRequestResponse>
  >;
}

async function getLoggedInUserProfilePicutre(): Promise<DataResult<string>> {
  const urlParams: UrlParameter[] = [{ key: "userId", value: currentUserId }];
  const finalUrl = url + "/profile/picture";

  return await fetchService.get(finalUrl, urlParams, [jwtHeader]);
}

async function getLoggedInUser(): Promise<DataResult<UserWrapper>> {
  const finalUrl = url + `/${currentUserId}`;

  return (await fetchService.get(finalUrl, undefined, [jwtHeader])) as Promise<DataResult<UserWrapper>>;
}

async function searchUsers(containsString: string, maxSize: string): Promise<DataResult<UserHeader[]>> {
  const urlParams: UrlParameter[] = [
    { key: "userId", value: currentUserId },
    { key: "containsString", value: containsString },
    { key: "maxSize", value: maxSize },
  ];
  const finalUrl = url + "/search";
  return (await fetchService.get(finalUrl, urlParams, [jwtHeader])) as Promise<DataResult<UserHeader[]>>;
}

async function findMyFriends(pageNumber: string, pageSize: string): Promise<DataResult<Page<Friend>>> {
  const finalUrl = url + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: currentUserId },
    { key: "page", value: pageNumber },
    { key: "size", value: pageSize },
  ];
  return (await fetchService.get(finalUrl, urlParams, [jwtHeader])) as Promise<DataResult<Page<Friend>>>;
}

async function findUserFriends(userId: string, pageNumber: string, pageSize: string): Promise<DataResult<Page<Friend>>> {
  const finalUrl = url + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "currentUserId", value: currentUserId },
    { key: "userId", value: userId },
    { key: "page", value: pageNumber },
    { key: "size", value: pageSize },
  ];
  return (await fetchService.get(finalUrl, urlParams, [jwtHeader])) as Promise<DataResult<Page<Friend>>>;
}

async function findUser(userId: string): Promise<DataResult<UserWrapper>> {
  const finalUrl = url + `/${userId}`;
  const urlParams: UrlParameter[] = [{ key: "currentUserId", value: currentUserId }];

  return (await fetchService.get(finalUrl, urlParams, [jwtHeader, applicationJsonHeader])) as Promise<DataResult<UserWrapper>>;
}

async function updateUserProfile(userProfile: UserProfile): Promise<DataResult<UserProfile>> {
  const { firstName, lastName, city, country, profilePicture } = userProfile;
  const finalUrl = url + "/profile";
  const urlParams: UrlParameter[] = [{ key: "userId", value: currentUserId }];

  const formData = new FormData();
  if (profilePicture) {
    const blobProfilePicture = new Blob([profilePicture], { type: "image/jpeg" });
    formData.append("profilePicture", blobProfilePicture, "profile.jpg");
  }

  const userProfileRequest = { firstName, lastName, city, country };
  const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
  formData.append("request", requestBlob);

  return (await fetchService.put(finalUrl, formData, urlParams, [jwtHeader])) as Promise<DataResult<UserProfile>>;
}

async function updateUserProfileConfig(userProfileConfig: UserProfileConfig): Promise<DataResult<UserProfileConfig>> {
  const urlParams: UrlParameter[] = [{ key: "userId", value: currentUserId }];
  const finalUrl = url + "/profile/config";

  return (await fetchService.put(finalUrl, userProfileConfig, urlParams, [applicationJsonHeader, jwtHeader])) as Promise<
    DataResult<UserProfileConfig>
  >;
}

async function removeFriendFromFriendList(friendId: string): Promise<void> {
  const finalUrl = url + "/friend/remove";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: currentUserId },
    { key: "friendId", value: friendId },
  ];

  await fetchService.deleteRequest(finalUrl, urlParams, [jwtHeader]);
}

const userService: UserService = {
  sendFriendRequest: sendFriendRequest,
  getLoggedInUserProfilePicutre: getLoggedInUserProfilePicutre,
  searchUsers: searchUsers,
  findMyFriends: findMyFriends,
  findUserFriends: findUserFriends,
  findUser: findUser,
  getLoggedInUser: getLoggedInUser,
  updateUserProfile: updateUserProfile,
  updateUserProfileConfig: updateUserProfileConfig,
  removeFriendFromFriendList: removeFriendFromFriendList,
};

export default userService;
