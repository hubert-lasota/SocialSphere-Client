import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { PostContext } from "../../contexts/PostContext";
import "../../css/global.css";
import postService from "../../services/postService";
import { DataResult, Page } from "../../types/common.types";
import { Post, PostRequest } from "../../types/post.types";
import Header from "./Header";
import css from "./home.module.css";
import LeftAside from "./LeftAside";
import Main from "./Main";
import RightAside from "./RightAside";

type Loading = "loading" | "postLoading" | "success";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<Loading>("loading");

  const fetchPosts = async () => {
    if (isLastPage) {
      return;
    }

    setLoading("postLoading");
    const response: DataResult<Page<Post>> = await postService.findPostPageForCurrentUser(page, 5);
    if (response.success) {
      const postPage = response.data;
      const newPage = page + 1;
      setPage(newPage);
      setIsLastPage(postPage.last);
      const newPosts = [...posts, ...postPage.content];
      setPosts(newPosts);
    } else {
      setIsLastPage(true);
    }

    setLoading("success");
  };

  const handleEndOfPage = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (post: PostRequest) => {
    const response = await postService.createPost(post);
    if (response.success) {
      const newPosts = [response.data, ...posts];
      setPosts(newPosts);
    }
  };

  const postContextValue = {
    onAddPost: handleAddPost,
  };

  if (loading === "loading") {
    return <Loading pageLoading={true} />;
  }

  return (
    <PostContext.Provider value={postContextValue}>
      <div className={css["home"]} onScroll={handleEndOfPage}>
        <Header />
        <LeftAside />
        <Main posts={posts} />
        <RightAside />
      </div>
    </PostContext.Provider>
  );
}
