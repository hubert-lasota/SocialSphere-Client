import { PostPage } from "../types/post.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import getJwtHeaderFromLocalStorage from "../utils/getJwtHeaderFromLocalStorage";
import fetchService, { UrlParameter } from "./fetchService";

interface PostService {
  findPostPage: (pageNumber: string, pageSize: string) => Promise<PostPage>;
}
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

const postService: PostService = { findPostPage: findPostPage };

export default postService;
