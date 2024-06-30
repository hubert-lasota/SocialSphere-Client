import { SearchUsersResponse } from "../types/user.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { ResponseFormat, UrlParameter } from "./fetchService";

interface UserService {
  getLoggedInUserProfilePicutreUrl: () => Promise<string>;
  searchUsers: (
    containsString: string,
    maxSize: string
  ) => Promise<SearchUsersResponse>;
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

const userService: UserService = {
  getLoggedInUserProfilePicutreUrl: getLoggedInUserProfilePicutreUrl,
  searchUsers: searchUsers,
};

export default userService;
