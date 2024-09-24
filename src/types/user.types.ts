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
  userProfileConfig: UserProfileConfig
}

export interface User {
  id: number;
  username: string;
  relationshipStatus: RelationshipStatus;
}

export type RelationshipStatus = "YOU" | "FRIEND" | "STRANGER";

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

export interface Friend {
  user: User;
  userProfile: UserProfile;
}

export interface FriendRequestResponse {
  id: number;
  sender: UserHeader;
  status: FriendRequestStatus;
}

export type FriendRequestStatus = "ACCEPTED" | "REJECTED" | "WAITING_FOR_RESPONSE";
