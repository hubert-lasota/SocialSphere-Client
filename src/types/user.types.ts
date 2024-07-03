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
}

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
