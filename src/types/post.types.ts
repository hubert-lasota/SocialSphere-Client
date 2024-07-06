import { UserProfile } from "./user.types";

export interface PostResponse {
  post: Post;
  code: string;
  message: string;
  success: boolean
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
  isLiked: boolean
};

export interface PostCommentResponse {
  comment: PostComment
  code: string
  message: string
  success: boolean
}

export interface PostCommentPage {
  content: PostComment[];
  last: boolean
}

export interface PostComment {
  id: number;
  postId: number;
  authorId: number;
  authorProfile: UserProfile;
  content: string
}

export interface PostLikeResponse {
  postId: number,
  userId: number,
  code: string,
  message: string,
  success: boolean
}