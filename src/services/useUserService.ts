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
import useFetchService, { UrlParameter } from "./useFetchService";

interface UserService {
  createProfile: (userProfileRequest: UserProfileRequest, profilePicture: File | null) => Promise<DataResult<UserProfile>>;
  createProfileConfig: (userProfileConfig: UserProfileConfig) => Promise<DataResult<UserProfileConfig>>;
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

export default function useUserService(): UserService {
  const { get, post, put, patch, deleteRequest } = useFetchService();
  const URL = "http://localhost:8080/api/v1/user";

  const createProfile = (userProfileRequest: UserProfileRequest, profilePicture: File | null) => {
    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture, profilePicture.name);
    }

    const requestBlob = new Blob([JSON.stringify(userProfileRequest)], { type: "application/json" });
    formData.append("request", requestBlob);

    const finalUrl = URL + "/profile";
    return post(finalUrl, formData);
  };

  const createProfileConfig = (userProfileConfig: UserProfileConfig) => {
    const finalUrl = URL + "/profile/config";

    return post(finalUrl, userProfileConfig);
  };

  const acceptFriendRequest = (friendRequestId: number) => {
    const finalUrl = URL + "/friend/accept";
    const params: UrlParameter[] = [{ key: "friendRequestId", value: friendRequestId.toString() }];

    return patch(finalUrl, undefined, params);
  };

  const rejectFriendRequest = (friendRequestId: number) => {
    const finalUrl = URL + "/friend/reject";
    const params: UrlParameter[] = [{ key: "friendRequestId", value: friendRequestId.toString() }];

    return patch(finalUrl, undefined, params);
  };

  const sendFriendRequest = (receiverId: number) => {
    const finalUrl = URL + "/friend/send";
    const body = { receiverId: receiverId.toString() };

    return post(finalUrl, body);
  };

  const getLoggedInUserProfilePicutre = () => {
    const finalUrl = URL + "/profile/picture";

    return get(finalUrl);
  };

  const getLoggedInUser = () => {
    return get(URL);
  };

  const getLoggedInUserHeader = () => {
    const params: UrlParameter[] = [{ key: "header", value: "true" }];

    return get(URL, params);
  };

  const searchUsers = (pattern: string, size: number) => {
    const urlParams: UrlParameter[] = [
      { key: "pattern", value: pattern },
      { key: "size", value: size.toString() },
    ];
    const finalUrl = URL + "/search";
    return get(finalUrl, urlParams);
  };

  const findMyFriends = (page: number, size: number) => {
    const finalUrl = URL + "/friend";
    const urlParams: UrlParameter[] = [
      { key: "page", value: page.toString() },
      { key: "size", value: size.toString() },
    ];
    return get(finalUrl, urlParams);
  };

  const findMyFriendsWithNoSharedChats = () => {
    const finalUrl = URL + "/friend";
    const urlParams: UrlParameter[] = [{ key: "noSharedChat", value: "true" }];

    return get(finalUrl, urlParams);
  };

  const findUserFriends = (userId: number, page: number, size: number) => {
    const finalUrl = URL + "/friend";
    const urlParams: UrlParameter[] = [
      { key: "userId", value: userId.toString() },
      { key: "page", value: page.toString() },
      { key: "size", value: size.toString() },
    ];
    return get(finalUrl, urlParams);
  };

  const findUser = (userId: number) => {
    const finalUrl = URL + `/${userId}`;

    return get(finalUrl);
  };

  const findCurrentUserFriendNotifications = () => {
    const finalUrl = URL + "/friend/notification";

    return get(finalUrl);
  };

  const findUserFriendRequestForCurrentUser = (userId: number) => {
    const finalUrl = URL + "/friend/request/toCurrentUser";
    const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

    return get(finalUrl, params);
  };

  const updateUserProfile = (userProfile: UserProfile) => {
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

    return put(finalUrl, formData);
  };

  const updateUserProfileConfig = (userProfileConfig: UserProfileConfig) => {
    const finalUrl = URL + "/profile/config";

    return put(finalUrl, userProfileConfig);
  };

  const removeFriendFromFriendList = (friendId: number) => {
    const finalUrl = URL + "/friend/remove";
    const urlParams: UrlParameter[] = [{ key: "friendId", value: friendId.toString() }];

    return deleteRequest(finalUrl, urlParams);
  };

  const isCurrentUserWaitingForFriendResponse = (userId: number) => {
    const finalUrl = URL + "/friend/isCurrentUserWaiting";
    const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

    return get(finalUrl, params);
  };

  const isCurrentUserHasPermissionToCheckProfile = (userId: number) => {
    const finalUrl = URL + "/isAllowed";
    const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

    return get(finalUrl, params);
  };

  const isUserWaitingForCurrentUserFriendResponse = (userId: number) => {
    const finalUrl = URL + "/friend/isUserWaiting";
    const params: UrlParameter[] = [{ key: "userId", value: userId.toString() }];

    return get(finalUrl, params);
  };

  return {
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
}
