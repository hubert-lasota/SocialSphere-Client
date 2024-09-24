import { DataResult, Page } from "../types/common.types";
import { Post, PostComment, PostLike, PostNotification, PostRequest } from "../types/post.types";
import fetchService, { UrlParameter } from "./fetchService";

interface PostService {
  addLikeToPost: (postId: number) => Promise<DataResult<PostLike>>;
  createPost: (request: PostRequest) => Promise<DataResult<Post>>;
  createPostComment: (postId: number, content: string) => Promise<DataResult<PostComment>>;
  findUserPostPage: (page: number, size: number, userId?: string) => Promise<DataResult<Page<Post>>>;
  findPostPageForCurrentUser: (page: number, size: number) => Promise<DataResult<Page<Post>>>;
  findPostCommentPage: (postId: number, page: number, size: number) => Promise<DataResult<Page<PostComment>>>;
  findPostNotifications: () => Promise<DataResult<PostNotification[]>>;
  updatePost: (postId: number, request: PostRequest) => Promise<DataResult<Post>>;
  updatePostComment: (postCommentId: number, postId: number, content: string) => Promise<DataResult<PostComment>>;
  deletePost: (postId: number) => Promise<DataResult<any>>;
  deletePostComment: (postCommentId: number) => Promise<DataResult<any>>;
  removeLikeFromPost: (postId: number) => Promise<DataResult<PostLike>>;
}

const URL = "http://localhost:8080/api/v1/post";

function createPost(request: PostRequest): Promise<DataResult<Post>> {
  const formData = new FormData();

  const requestBody = { content: request.content };
  const contentBlob = new Blob([JSON.stringify(requestBody)], { type: "application/json" });
  formData.append("request", contentBlob);

  const images = request.images;
  if (images) {
    images.forEach((img) => {
      const blob = new Blob([img], { type: "image/jpeg" });
      formData.append("images", blob, img.name);
    });
  }

  return fetchService.post(URL, formData) as Promise<DataResult<Post>>;
}

function addLikeToPost(postId: number): Promise<DataResult<PostLike>> {
  const finalUrl = URL + "/like/add";

  return fetchService.post(finalUrl, { postId: postId }) as Promise<DataResult<PostLike>>;
}

function createPostComment(postId: number, content: string): Promise<DataResult<PostComment>> {
  const finalUrl = URL + "/comment";
  const body = { postId: postId, content: content };
  return fetchService.post(finalUrl, body) as Promise<DataResult<PostComment>>;
}

function findUserPostPage(page: number, size: number, userId?: string): Promise<DataResult<Page<Post>>> {
  const urlParams: UrlParameter[] = [
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];

  if (userId) {
    urlParams.push({ key: "userId", value: userId });
  }

  return fetchService.get(URL, urlParams) as Promise<DataResult<Page<Post>>>;
}

function findPostPageForCurrentUser(page: number, size: number): Promise<DataResult<Page<Post>>> {
  const finalUrl = URL + "/recent";
  const urlParams: UrlParameter[] = [
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];

  return fetchService.get(finalUrl, urlParams) as Promise<DataResult<Page<Post>>>;
}

function findPostCommentPage(postId: number, page: number, size: number): Promise<DataResult<Page<PostComment>>> {
  const urlParams: UrlParameter[] = [
    { key: "postId", value: postId.toString() },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  const finalUrl = URL + "/comment";

  return fetchService.get(finalUrl, urlParams) as Promise<DataResult<Page<PostComment>>>;
}

function findPostNotifications() {
  const finalUrl = URL + "/notification";

  return fetchService.get(finalUrl);
}

function updatePost(postId: number, request: PostRequest) {
  const finalUrl = URL + `/${postId}`;
  const formData = new FormData();

  const requestBody = { content: request.content };
  const contentBlob = new Blob([JSON.stringify(requestBody)], { type: "application/json" });
  formData.append("request", contentBlob);

  const images = request.images;
  if (images) {
    images.forEach((img) => {
      const blob = new Blob([img], { type: "image/jpeg" });
      formData.append("images", blob, img.name);
    });
  }

  return fetchService.put(finalUrl, formData) as Promise<DataResult<Post>>;
}

function updatePostComment(postCommentId: number, postId: number, content: string): Promise<DataResult<PostComment>> {
  const finalUrl = URL + `/comment/${postCommentId}`;
  const body = { postId: postId, content: content };
  return fetchService.put(finalUrl, body) as Promise<DataResult<PostComment>>;
}

function deletePost(postId: number) {
  const finalUrl = URL + `/${postId}`;
  return fetchService.deleteRequest(finalUrl) as Promise<DataResult<any>>;
}

function deletePostComment(postCommentId: number) {
  const finalUrl = URL + `/comment/${postCommentId}`;
  return fetchService.deleteRequest(finalUrl) as Promise<DataResult<any>>;
}

function removeLikeFromPost(postId: number): Promise<DataResult<PostLike>> {
  const finalUrl = URL + "/like/remove";
  const params: UrlParameter[] = [{ key: "postId", value: postId.toString() }];

  return fetchService.deleteRequest(finalUrl, params) as Promise<DataResult<PostLike>>;
}

const postService: PostService = {
  createPost,
  findUserPostPage,
  findPostPageForCurrentUser,
  findPostCommentPage,
  findPostNotifications,
  createPostComment,
  addLikeToPost,
  removeLikeFromPost,
  updatePost,
  updatePostComment,
  deletePost,
  deletePostComment,
};

export default postService;
