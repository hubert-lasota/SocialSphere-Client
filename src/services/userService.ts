import { DataResult, Page } from "../types/common.types";
import { Friend, FriendRequestResponse, UserHeader, UserProfile, UserProfileConfig, UserWrapper } from "../types/user.types";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface UserService {
  sendFriendRequest: (receiverId: number) => Promise<DataResult<FriendRequestResponse>>;
  getLoggedInUserProfilePicutre: () => Promise<DataResult<string>>;
  getLoggedInUser: () => Promise<DataResult<UserWrapper>>;
  searchUsers: (containsString: string, size: number) => Promise<DataResult<UserHeader[]>>;
  findMyFriends: (page: number, size: number) => Promise<DataResult<Page<Friend>>>;
  findUserFriends: (userId: number, page: number, size: number) => Promise<DataResult<Page<Friend>>>;
  findUser: (userId: number) => Promise<DataResult<UserWrapper>>;
  updateUserProfile: (userProfile: UserProfile) => Promise<DataResult<UserProfile>>;
  updateUserProfileConfig: (useProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
  removeFriendFromFriendList: (friendId: number) => Promise<DataResult<any>>;
}

const url = "http://localhost:8080/api/v1/user";
const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];
const jwtHeader: [string, string] = getJwtHeaderFromLocalStorage();

function sendFriendRequest(receiverId: number): Promise<DataResult<FriendRequestResponse>> {
  const finalUrl = url + "/friend/send";
  const body = { receiverId: receiverId.toString() };

  return fetchService.post(finalUrl, body, undefined, [jwtHeader, applicationJsonHeader]) as Promise<DataResult<FriendRequestResponse>>;
}

function getLoggedInUserProfilePicutre(): Promise<DataResult<string>> {
  const finalUrl = url + "/profile/picture";

  return fetchService.get(finalUrl, undefined, [jwtHeader]);
}

function getLoggedInUser(): Promise<DataResult<UserWrapper>> {
  return fetchService.get(url, undefined, [jwtHeader]) as Promise<DataResult<UserWrapper>>;
}

function searchUsers(containsString: string, size: number): Promise<DataResult<UserHeader[]>> {
  const urlParams: UrlParameter[] = [
    { key: "containsString", value: containsString },
    { key: "size", value: size.toString() },
  ];
  const finalUrl = url + "/search";
  return fetchService.get(finalUrl, urlParams, [jwtHeader]) as Promise<DataResult<UserHeader[]>>;
}

function findMyFriends(page: number, size: number): Promise<DataResult<Page<Friend>>> {
  const finalUrl = url + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams, [jwtHeader]) as Promise<DataResult<Page<Friend>>>;
}

function findUserFriends(userId: number, page: number, size: number): Promise<DataResult<Page<Friend>>> {
  const finalUrl = url + "/friend";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId.toString() },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  return fetchService.get(finalUrl, urlParams, [jwtHeader]) as Promise<DataResult<Page<Friend>>>;
}

function findUser(userId: number): Promise<DataResult<UserWrapper>> {
  const finalUrl = url + `/${userId}`;

  return fetchService.get(finalUrl, undefined, [jwtHeader, applicationJsonHeader]) as Promise<DataResult<UserWrapper>>;
}

function updateUserProfile(userProfile: UserProfile): Promise<DataResult<UserProfile>> {
  const { firstName, lastName, city, country, profilePicture } = userProfile;
  const finalUrl = url + "/profile";

  const formData = new FormData();
  if (profilePicture) {
    const blobProfilePicture = new Blob([profilePicture], { type: "image/jpeg" });
    formData.append("profilePicture", blobProfilePicture, "profile.jpg");
  }

  const userProfileRequest = { firstName, lastName, city, country };
  const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
  formData.append("request", requestBlob);

  return fetchService.put(finalUrl, formData, undefined, [jwtHeader]) as Promise<DataResult<UserProfile>>;
}

function updateUserProfileConfig(userProfileConfig: UserProfileConfig): Promise<DataResult<UserProfileConfig>> {
  const finalUrl = url + "/profile/config";

  return fetchService.put(finalUrl, userProfileConfig, undefined, [applicationJsonHeader, jwtHeader]) as Promise<DataResult<UserProfileConfig>>;
}

function removeFriendFromFriendList(friendId: number): Promise<DataResult<any>> {
  const finalUrl = url + "/friend/remove";
  const urlParams: UrlParameter[] = [{ key: "friendId", value: friendId.toString() }];

  return fetchService.deleteRequest(finalUrl, urlParams, [jwtHeader]);
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
