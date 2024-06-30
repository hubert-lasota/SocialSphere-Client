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
};

export interface UserProfile {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profilePicture: Uint8Array | null;
};
