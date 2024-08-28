import { DataResult, Page } from "../types/common.types";
import { Post, PostComment, PostLike, PostRequest } from "../types/post.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface PostService {
  createPost: (request: PostRequest) => Promise<DataResult<Post>>;
  addLikeToPost: (postId: number) => Promise<DataResult<PostLike>>;
  createPostComment: (postId: number, content: string) => Promise<DataResult<PostComment>>;
  findUserPostPage: (page: number, size: number, userId?: string) => Promise<DataResult<Page<Post>>>;
  findPostPageForCurrentUser: (page: number, size: number) => Promise<DataResult<Page<Post>>>;
  findPostCommentPage: (postId: number, page: number, size: number) => Promise<DataResult<Page<PostComment>>>;
  removeLikeFromPost: (postId: number) => Promise<DataResult<PostLike>>;
}

const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];
const jwtHeader: [string, string] = getJwtHeaderFromLocalStorage();
const currentUserId = getFromLocalStorage("user_id");
const url = "http://localhost:8080/api/v1/post";

function createPost(request: PostRequest): Promise<DataResult<Post>> {
  const formData = new FormData();

  const requestBody = { userId: currentUserId, content: request.content };
  const contentBlob = new Blob([JSON.stringify(requestBody)], { type: "application/json" });
  formData.append("request", contentBlob);

  const images = request.images;
  if (images) {
    images.forEach((img) => {
      const blob = new Blob([img], { type: "image/jpeg" });
      formData.append("images", blob, img.name);
    });
  }
 
  return fetchService.post(url, formData, undefined, [jwtHeader]) as Promise<DataResult<Post>>;
}


function addLikeToPost(postId: number): Promise<DataResult<PostLike>> {
  const finalUrl = url + "/like/add";

  return fetchService.post(finalUrl, { postId: postId, userId: currentUserId }, undefined, [jwtHeader, applicationJsonHeader]) as Promise<
    DataResult<PostLike>
  >;
}

function createPostComment(postId: number, content: string): Promise<DataResult<PostComment>> {
  const finalUrl = url + "/comment";
  const body = { postId: postId, authorId: currentUserId, content: content };
  return fetchService.post(finalUrl, body, undefined, [jwtHeader, applicationJsonHeader]) as Promise<DataResult<PostComment>>;
}

function findUserPostPage(page: number, size: number, userId?: string): Promise<DataResult<Page<Post>>> {
  const urlParams: UrlParameter[] = [
    { key: "currentUserId", value: currentUserId },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];

  if (userId) {
    urlParams.push({ key: "userToCheckId", value: userId });
  }

  return fetchService.get(url, urlParams, [jwtHeader]) as Promise<DataResult<Page<Post>>>;
}

function findPostPageForCurrentUser(page: number, size: number): Promise<DataResult<Page<Post>>> {
  const finalUrl = url + "/recent";
  const urlParams: UrlParameter[] = [
    { key: "userId", value: currentUserId },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];

  return fetchService.get(finalUrl, urlParams, [jwtHeader]) as Promise<DataResult<Page<Post>>>;
}

function findPostCommentPage(postId: number, page: number, size: number): Promise<DataResult<Page<PostComment>>> {
  const urlParams: UrlParameter[] = [
    { key: "postId", value: postId.toString() },
    { key: "page", value: page.toString() },
    { key: "size", value: size.toString() },
  ];
  const finalUrl = url + "/comment";

  return fetchService.get(finalUrl, urlParams, [jwtHeader, applicationJsonHeader]) as Promise<DataResult<Page<PostComment>>>;
}

function removeLikeFromPost(postId: number): Promise<DataResult<PostLike>> {
  const finalUrl = url + "/like/remove";
  const params: UrlParameter[] = [
    { key: "postId", value: postId.toString() },
    { key: "userId", value: currentUserId },
  ];

  return fetchService.deleteRequest(finalUrl, params, [jwtHeader]) as Promise<DataResult<PostLike>>;
}

const postService: PostService = {
  createPost: createPost,
  findUserPostPage: findUserPostPage,
  findPostPageForCurrentUser: findPostPageForCurrentUser,
  findPostCommentPage: findPostCommentPage,
  createPostComment: createPostComment,
  addLikeToPost: addLikeToPost,
  removeLikeFromPost: removeLikeFromPost,
};

export default postService;
