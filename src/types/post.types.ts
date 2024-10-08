import { FileDetails } from "./common.types";
import { UserHeader, UserProfile } from "./user.types";

export interface Post {
  id: number;
  userId: number;
  userProfile: UserProfile;
  content: string;
  images: FileDetails[] | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface PostRequest {
  content: string;
  images: File[] | null | undefined;
}

export type AddPostResult = "success" | "error";

export interface PostComment {
  id: number;
  postId: number;
  authorId: number;
  authorProfile: UserProfile;
  content: string;
  createdAt: string;
}

export interface PostLike {
  postId: number;
  userId: number;
}

export interface PostNotification {
  id: number;
  updatedPost: Post
  updateType: PostNotificationType
  updatedBy: UserHeader
  updatedAt: string
  checked: boolean;
}


export type PostNotificationType = "LIKE" | "COMMENT"