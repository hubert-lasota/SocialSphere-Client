import { DataResult, Page } from "../types/common.types";
import { Post, PostComment, PostLike, PostNotification, PostRequest } from "../types/post.types";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import useFetchService, { UrlParameter } from "./useFetchService";

interface PostService {
  addLikeToPost: (postId: number) => Promise<DataResult<PostLike>>;
  createPost: (request: PostRequest) => Promise<DataResult<Post>>;
  createPostComment: (postId: number, content: string) => Promise<DataResult<PostComment>>;
  findUserPostPage: (page: number, size: number, userId: number) => Promise<DataResult<Page<Post>>>;
  findPostPageForCurrentUser: (page: number, size: number) => Promise<DataResult<Page<Post>>>;
  findPostCommentPage: (postId: number, page: number, size: number) => Promise<DataResult<Page<PostComment>>>;
  findPostNotifications: () => Promise<DataResult<PostNotification[]>>;
  updatePost: (postId: number, request: PostRequest) => Promise<DataResult<Post>>;
  updatePostComment: (postCommentId: number, postId: number, content: string) => Promise<DataResult<PostComment>>;
  deletePost: (postId: number) => Promise<DataResult<any>>;
  deletePostComment: (postCommentId: number) => Promise<DataResult<any>>;
  removeLikeFromPost: (postId: number) => Promise<DataResult<PostLike>>;
}

export default function usePostService(): PostService {
  const { get, post, put, deleteRequest } = useFetchService();
  const URL = "http://localhost:8080/api/v1/post";

  const createPost = (request: PostRequest) => {
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

    return post(URL, formData);
  };

  const addLikeToPost = (postId: number) => {
    const finalUrl = URL + "/like/add";

    return post(finalUrl, { postId: postId });
  };

  const createPostComment = (postId: number, content: string) => {
    const finalUrl = URL + "/comment";
    const body = { postId: postId, content: content };
    return post(finalUrl, body);
  };

  const findUserPostPage = (page: number, size: number, userId: number) => {
    const urlParams: UrlParameter[] = [
      { key: "page", value: page.toString() },
      { key: "size", value: size.toString() },
    ];

    const currentUserId = parseInt(getFromLocalStorage("user_id"));
    if (currentUserId !== userId) {
      urlParams.push({ key: "userId", value: userId.toString() });
    }

    return get(URL, urlParams);
  };

  const findPostPageForCurrentUser = (page: number, size: number) => {
    const finalUrl = URL + "/recent";
    const urlParams: UrlParameter[] = [
      { key: "page", value: page.toString() },
      { key: "size", value: size.toString() },
    ];

    return get(finalUrl, urlParams);
  };

  function findPostCommentPage(postId: number, page: number, size: number) {
    const urlParams: UrlParameter[] = [
      { key: "postId", value: postId.toString() },
      { key: "page", value: page.toString() },
      { key: "size", value: size.toString() },
    ];
    const finalUrl = URL + "/comment";

    return get(finalUrl, urlParams);
  }

  const findPostNotifications = () => {
    const finalUrl = URL + "/notification";

    return get(finalUrl);
  };

  const updatePost = (postId: number, request: PostRequest) => {
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

    return put(finalUrl, formData);
  };

  const updatePostComment = (postCommentId: number, postId: number, content: string) => {
    const finalUrl = URL + `/comment/${postCommentId}`;
    const body = { postId: postId, content: content };
    return put(finalUrl, body);
  };

  const deletePost = (postId: number) => {
    const finalUrl = URL + `/${postId}`;
    return deleteRequest(finalUrl);
  };

  const deletePostComment = (postCommentId: number) => {
    const finalUrl = URL + `/comment/${postCommentId}`;
    return deleteRequest(finalUrl);
  };

  const removeLikeFromPost = (postId: number) => {
    const finalUrl = URL + "/like/remove";
    const params: UrlParameter[] = [{ key: "postId", value: postId.toString() }];

    return deleteRequest(finalUrl, params);
  };

  return {
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
}
