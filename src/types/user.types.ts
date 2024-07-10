export interface SearchUsersResponse {
  users: SearchUsers[];
  code: string;
  message?: string;
  success: boolean;
}

export interface SearchUsers {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: Uint8Array | null;
  relationshipStatus: RelationshipStatus
}

export interface UserResponse {
  user: User;
  userProfile: UserProfile;
  userProfileConfig: UserProfileConfig;
  code: string;
  message: string;
  success: boolean;
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
  profilePicture: Uint8Array | null;
}

export interface UserProfileConfig {
  profilePrivacyLevel: ProfilePrivacyLevel;
}

enum ProfilePrivacyLevel {
  PRIVATE,
  PUBLIC,
  FRIENDS,
}

export interface Friend {
  user: { id: number; username: string };
  userProfile: UserProfile;
}

export interface FriendPage {
  content: Friend[];
  last: boolean;
}

export interface FriendRequestResponse {
  response: { senderId: number; receiverId: number; status: FriendRequestStatus };
  code: string;
  message: string;
  success: boolean;
}

export type FriendRequestStatus = "ACCEPTED" | "REJECTED" | "WAITING_FOR_RESPONSE";
