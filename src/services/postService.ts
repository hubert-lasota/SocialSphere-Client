import { Post, PostLikeResponse, PostPage } from "../types/post.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface PostService {
  findPostPage: (pageNumber: string, pageSize: string) => Promise<PostPage>;
  addLikeToPost: (postId: string) => Promise<PostLikeResponse>;
  removeLikeFromPost: (postId: string) => Promise<PostLikeResponse>;
}

const applicationJsonHeader: [string, string] = [
  "Content-Type",
  "application/json",
];

const url = "http://localhost:8080/api/v1/post";

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

function addLikeToPost(postId: string): Promise<PostLikeResponse> {
  const userId = getFromLocalStorage("user_id");
  const finalUrl = url + "/like/add";
  const jwtHeader = getJwtHeaderFromLocalStorage();

  return fetchService.post(finalUrl, {postId: postId, userId: userId}, undefined, [jwtHeader, applicationJsonHeader]) as Promise<PostLikeResponse>;
}

function removeLikeFromPost(postId: string): Promise<PostLikeResponse> {
  const userId = getFromLocalStorage("user_id");
  const finalUrl = url + "/like/remove"
  const params: UrlParameter[] = [{key: "postId", value: postId}, {key: "userId", value: userId}];
  const jwtHeader = getJwtHeaderFromLocalStorage();

  return fetchService.deleteRequest(finalUrl, params, [jwtHeader]) as Promise<PostLikeResponse>;
}

const postService: PostService = { findPostPage: findPostPage, addLikeToPost: addLikeToPost, removeLikeFromPost: removeLikeFromPost };

export default postService;
