import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import PostList from "../../components/Post_old/PostList";
import postService from "../../services/postService";
import { DataResult, Page } from "../../types/common.types";
import { Post } from "../../types/post.types";
import css from "./home.module.css";

export default function HomeMain() {
  const [postPage, setPostPage] = useState<Page<Post>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleFetchPost(pageNumber: number) {
    setLoading(true);
    const response: DataResult<Page<Post>> = await postService.findPostPageForCurrentUser(`${pageNumber}`, "5");
    if (!response.success) {
      setLoading(false);
      return;
    }
    const postPage = response.data;
    setPostPage(postPage);
    const postList: Post[] = [...posts, ...postPage.content];
    setPosts(postList);
    setLoading(false);
  }

  function handleEndOfPage() {
    if (typeof postPage === "undefined" || !postPage) {
      console.warn("page is null or undefined", postPage);
      return;
    }

    if (postPage.last) {
      console.warn("There are no more available posts");
      setLoading(false);
      return;
    }
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    handleFetchPost(nextPage);
  }

  useEffect(() => {
    handleFetchPost(0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        setLoading(true);
        handleEndOfPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postPage]);

  return (
    <div className={css["home__main"]}>
      <PostList posts={posts} />
      {loading ? <Loading className="small-loader" /> : <></>}
    </div>
  );
}
