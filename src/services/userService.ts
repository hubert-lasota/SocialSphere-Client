import { FriendPage, SearchUsersResponse, UserResponse } from "../types/user.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { ResponseFormat, UrlParameter } from "./fetchService";

interface UserService {
  getLoggedInUserProfilePicutreUrl: () => Promise<string>;
  searchUsers: (
    containsString: string,
    maxSize: string
  ) => Promise<SearchUsersResponse>;
  findMyFriends: (pageNumber: string, pageSize: string) => Promise<FriendPage>
  getLoggedInUser: () => Promise<UserResponse>;
}

const url = "http://localhost:8080/api/v1/user";
const applicationJsonHeader: [string, string] = [
  "Content-Type",
  "application/json",
];

async function getLoggedInUserProfilePicutreUrl(): Promise<string> {
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [{ key: "userId", value: userId }];
  const finalUrl = url + "/profile/picture";

  const profilePictureBlob: Blob = await fetchService.get(
    finalUrl,
    urlParams,
    [tokenHeader],
    ResponseFormat.BLOB
  );
  return URL.createObjectURL(profilePictureBlob);
}

async function getLoggedInUser(): Promise<UserResponse> {
    const userId = getFromLocalStorage("user_id");
    const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
    const finalUrl = url + `/${userId}`;

  return await fetchService.get(finalUrl, undefined, [tokenHeader]) as UserResponse;
}

async function searchUsers(
  containsString: string,
  maxSize: string
): Promise<SearchUsersResponse> {
  const userId = getFromLocalStorage("user_id");
  const tokenHeader: [string, string] = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId },
    { key: "containsString", value: containsString },
    { key: "maxSize", value: maxSize },
  ];
  const finalUrl = url + "/search";
  return await fetchService.get(finalUrl, urlParams, [tokenHeader]);
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
  return await fetchService.get(finalUrl, urlParams, [tokenHeader]);
}

const userService: UserService = {
  getLoggedInUserProfilePicutreUrl: getLoggedInUserProfilePicutreUrl,
  searchUsers: searchUsers,
  findMyFriends: findMyFriends,
  getLoggedInUser: getLoggedInUser
};

export default userService;
