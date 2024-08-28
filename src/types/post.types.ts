import { FileDetails } from "./common.types";
import { UserProfile } from "./user.types";

export interface Post {
  id: number;
  userId: number;
  userProfile: UserProfile;
  content: string;
  images: FileDetails[] | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface PostRequest {
  content: string;
  images: File[] | null;
}

export type AddPostResult = "success" | "error";

export interface PostComment {
  id: number;
  postId: number;
  authorId: number;
  authorProfile: UserProfile;
  content: string;
}

export interface PostLike {
  postId: number;
  userId: number;
}
