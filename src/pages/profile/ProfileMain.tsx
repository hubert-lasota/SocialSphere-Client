import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import PostList from "../../components/Post/PostList";
import postService from "../../services/postService";
import { Post, PostPage } from "../../types/post.types";
import styles from "./profile.module.css";

type ProfileMainProps = {
  userId: number;
  isShowPosts: boolean
  isMoreAbout: boolean
  isSettings?: boolean
};

export default function ProfileMain(props: ProfileMainProps) {
  const { userId, isShowPosts, isMoreAbout, isSettings } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  async function handleFetchUserPosts(pageNumber: string) {
    setLoading(true);
    const postPage: PostPage = await postService.findUserPostPage(userId.toString(), pageNumber, "5");
    if (postPage && postPage.content) {
      setPosts(postPage.content);
      setIsLastPage(postPage.last);
    } else {
      setIsLastPage(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleFetchUserPosts(pageNumber.toString());
  }, []);

  function handleEndOfPage() {
    if (isLastPage) {
      return;
    }

    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      handleFetchUserPosts(nextPage.toString());
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleEndOfPage);

    return () => window.removeEventListener("scroll", handleEndOfPage);
  }, [posts]);

  return (
    <main className={styles["profile__main"]}>
      {isShowPosts ? <PostList posts={posts} /> : <></>}
      {loading ? <Loading className="post-loader" /> : <></>}
      {isMoreAbout ? <div>More abaout</div> : <></>}
      {isSettings ? <div>Settings</div> : <></>}
    </main>
  );
}
