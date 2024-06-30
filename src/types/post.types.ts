import { UserProfile } from "./user.types";

export interface PostResponse {
  post: Post;
  code: string;
  message: string;
};

export interface PostPage {
  content: Post[];
  last: boolean;
};

export interface Post {
  id: number;
  userId: number;
  userProfile: UserProfile;
  content: string;
  images: Uint8Array[];
  likeCount: number;
  commentCount: number;
};
