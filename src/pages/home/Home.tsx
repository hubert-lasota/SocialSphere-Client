import Loading from "../../components/loading/Loading";
import { ManagePostsContext } from "../../contexts/ManagePostsContext";
import useFetchCurrentUserProfilePicture from "../../hooks/useFetchCurrentUserProfilePicture";
import usePostService from "../../services/usePostService";
import { PostRequest } from "../../types/post.types";
import Header from "./Header";
import css from "./home.module.css";
import LeftAside from "./LeftAside";
import Main from "./Main";
import RightAside from "./RightAside";
import useFetchPostsForCurrentUser from "./useFetchPostsForCurrentUser";

export default function Home() {
  const { posts, setPosts, loading: postLoading, fetchNextPage } = useFetchPostsForCurrentUser();
  const postService = usePostService();
  const {picture, loading: profileLoading} = useFetchCurrentUserProfilePicture();
  const handleEndOfPage = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchNextPage();
    }
  };

  const handleDeletePost = async (postId: number) => {
    const response = await postService.deletePost(postId);
    if (response.success) {
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    }
  };

  const handleAddPost = async (post: PostRequest) => {
    const response = await postService.createPost(post);
    if (response.success) {
      const newPosts = [response.data, ...posts];
      setPosts(newPosts);
    }
  };

  const postContextValue = {
    currentUserProfilePictureSrc: picture,
    onAddPost: handleAddPost,
    onDeletePost: handleDeletePost,
  };

  if (postLoading || profileLoading) {
    return <Loading pageLoading={true} />;
  }

  return (
    <ManagePostsContext.Provider value={postContextValue}>
      <div className={css["home"]} onScroll={handleEndOfPage}>
        <Header />
        <LeftAside />
        <Main posts={posts} />
        <RightAside />
      </div>
    </ManagePostsContext.Provider>
  );
}
