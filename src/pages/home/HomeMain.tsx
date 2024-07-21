import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import PostList from "../../components/Post/PostList";
import postService from "../../services/postService";
import { Post, PostPage } from "../../types/post.types";
import css from "./home.module.css";

export default function HomeMain() {
  const [postPage, setPostPage] = useState<PostPage>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleFetchPost(pageNumber: number) {
    setLoading(true);
    const postPage: PostPage = await postService.findPostPageForCurrentUser(`${pageNumber}`, "5");
    if (!postPage) {
      setLoading(false);
      return;
    }

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
