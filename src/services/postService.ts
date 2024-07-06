import { Post, PostCommentPage, PostCommentResponse, PostLikeResponse, PostPage } from "../types/post.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface PostService {
  addLikeToPost: (postId: string) => Promise<PostLikeResponse>;
  createPostComment: (postId: string, content: string) => Promise<PostCommentResponse>;
  findPostPage: (pageNumber: string, pageSize: string) => Promise<PostPage>;
  findPostCommentPage: (postId: string, pageNumber: string, pageSize: string) => Promise<PostCommentPage>;
  removeLikeFromPost: (postId: string) => Promise<PostLikeResponse>;
}

const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];

const url = "http://localhost:8080/api/v1/post";

function addLikeToPost(postId: string): Promise<PostLikeResponse> {
  const userId = getFromLocalStorage("user_id");
  const finalUrl = url + "/like/add";
  const jwtHeader = getJwtHeaderFromLocalStorage();

  return fetchService.post(finalUrl, { postId: postId, userId: userId }, undefined, [
    jwtHeader,
    applicationJsonHeader,
  ]) as Promise<PostLikeResponse>;
}

function createPostComment(postId: string, content: string): Promise<PostCommentResponse> {
  const jwtHeader = getJwtHeaderFromLocalStorage();
  const authorId = getFromLocalStorage("user_id");
  const finalUrl = url + "/comment";
  const body = { postId: postId, authorId: authorId, content: content };
  return fetchService.post(finalUrl, body, undefined, [jwtHeader, applicationJsonHeader]) as Promise<PostCommentResponse>;
}

function findPostPage(pageNumber: string, pageSize: string): Promise<PostPage> {
  const jwtHeader = getJwtHeaderFromLocalStorage();
  const userId = getFromLocalStorage("user_id");
  const urlParams: UrlParameter[] = [
    { key: "userId", value: userId },
    { key: "page", value: pageNumber },
    { key: "size", value: pageSize },
  ];

  return fetchService.get(url, urlParams, [jwtHeader]) as Promise<PostPage>;
}

function findPostCommentPage(postId: string, pageNumber: string, pageSize: string): Promise<PostCommentPage> {
  const jwtHeader = getJwtHeaderFromLocalStorage();
  const urlParams: UrlParameter[] = [
    { key: "postId", value: postId },
    { key: "page", value: pageNumber },
    { key: "size", value: pageSize },
  ];
  const finalUrl = url + "/comment";

  return fetchService.get(finalUrl, urlParams, [jwtHeader, applicationJsonHeader]) as Promise<PostCommentPage>;
}

function removeLikeFromPost(postId: string): Promise<PostLikeResponse> {
  const userId = getFromLocalStorage("user_id");
  const finalUrl = url + "/like/remove";
  const params: UrlParameter[] = [
    { key: "postId", value: postId },
    { key: "userId", value: userId },
  ];
  const jwtHeader = getJwtHeaderFromLocalStorage();

  return fetchService.deleteRequest(finalUrl, params, [jwtHeader]) as Promise<PostLikeResponse>;
}

const postService: PostService = {
  findPostPage: findPostPage,
  findPostCommentPage: findPostCommentPage,
  createPostComment: createPostComment,
  addLikeToPost: addLikeToPost,
  removeLikeFromPost: removeLikeFromPost,
};

export default postService;
