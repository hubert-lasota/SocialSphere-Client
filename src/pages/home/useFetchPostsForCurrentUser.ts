import { useEffect, useRef, useState } from "react";
import usePostService from "../../services/usePostService";
import { Post } from "../../types/post.types";

export default function useFetchPostsForCurrentUser() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const postService = usePostService();

  const page = useRef<number>(0);

  // firstFetch to handle React Strict mode double re-render
  const fetchPosts = (page: number, firstFetch: boolean) => {
    setLoading(true);
    postService
      .findPostPageForCurrentUser(page, 5)
      .then((response) => {
        if (response.success) {
          const fetchedPage = response.data;
          const newPosts = fetchedPage.content;
          setIsLastPage(fetchedPage.last);
          if (firstFetch) {
            setPosts(newPosts);
          } else {
            setPosts((prev) => [...prev, ...newPosts]);
          }
        } else {
          setIsLastPage(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts(page.current, true);
  }, []);

  const fetchNextPage = () => {
    if (isLastPage) return;
    page.current++;
    fetchPosts(page.current, false);
  };

  return { posts, setPosts, loading, fetchNextPage };
}
