import { useEffect, useRef, useState } from "react";
import usePostService from "../../../services/usePostService";
import { PostComment } from "../../../types/post.types";

export default function useFetchPostComments(postId: number) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const postService = usePostService();

  const page = useRef<number>(0);

  // firstFetch to handle React Strict mode double re-render
  const fetchComments = (page: number, firstFetch: boolean) => {
    setLoading(true);
    postService
      .findPostCommentPage(postId, page, 5)
      .then((response) => {
        if (response.success) {
          const pageResponse = response.data;
          setIsLastPage(pageResponse.last);
          if (firstFetch) {
            setComments(pageResponse.content);
          } else {
            setComments((prev) => [...prev, ...pageResponse.content]);
          }
        } else {
          setIsLastPage(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments(page.current, true);
  }, [postId]);

  const fetchNextCommentPage = () => {
    if (isLastPage) return;
    page.current++;
    fetchComments(page.current, false);
  };

  return { comments, setComments, loading, last: isLastPage, fetchNextCommentPage };
}
