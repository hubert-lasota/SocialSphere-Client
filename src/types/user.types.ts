export interface UserHeader {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  relationshipStatus: RelationshipStatus;
}

export interface UserWrapper {
  user: User;
  userProfile: UserProfile;
  userProfileConfig: UserProfileConfig;
}

export interface User {
  id: number;
  username: string;
  relationshipStatus: RelationshipStatus;
}

export type RelationshipStatus = "YOU" | "FRIEND" | "STRANGER";

export interface UserProfileRequest {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profilePicture: string | null;
}

export interface UserProfileConfig {
  profilePrivacyLevel: ProfilePrivacyLevel;
}

export enum ProfilePrivacyLevel {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  FRIENDS = "FRIENDS",
}

export interface UserWithProfile {
  user: User;
  userProfile: UserProfile;
}

export interface FriendNotification {
  id: number;
  sender: UserHeader;
  status: FriendRequestStatus;
  sentAt: string;
}

export type FriendRequestStatus = "ACCEPTED" | "REJECTED" | "WAITING_FOR_RESPONSE";


export interface SearchFriendsRequest {
  firstNamePattern: string;
  lastNamePattern: string;
  cityPattern: string;
  countryPattern: string;
  relationshipStatus: SearchFriendsRelationshipStatus;
}

export enum SearchFriendsRelationshipStatus {
  ALL = "ALL",
  STRANGER = "STRANGER",
  FRIENDS = "FRIENDS",
}
