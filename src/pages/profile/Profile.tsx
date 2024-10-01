import { ReactNode, useState } from "react";
import Loading from "../../components/loading/Loading";
import { ManagePostsContext } from "../../contexts/ManagePostsContext";
import usePostService from "../../services/usePostService";
import css from "./profile.module.css";
import { ProfileContentType } from "./profile.types";
import { ProfileContext } from "./ProfileContext";
import useFetchFriends from "./useFetchFriends";
import useFetchPosts from "./useFetchPosts";
import useFetchUserWrapper from "./useFetchUserWrapper";

type ProfileProps = {
  userId: number;
  header?: ReactNode;
  leftAside?: ReactNode;
  main?: ReactNode;
};

export default function Profile(props: ProfileProps) {
  const { userId, header, leftAside, main } = props;
  const { userWrapper, loading: userLoading } = useFetchUserWrapper(userId);
  const { posts, setPosts, loading: postsLoading, fetchNextPage: fetchNextPostPage } = useFetchPosts(userId);
  const { friends, loading: friendsLoading, fetchNextPage: fetchNextFriendPage } = useFetchFriends(userId);
  const [contentType, setContentType] = useState<ProfileContentType>("posts");
  const postService = usePostService();

  const handleSetProfileContentType = (content: ProfileContentType) => {
    setContentType(content);
  };

  const handleDeletePost = async (postId: number) => {
    const filteredPosts = posts.filter((post) => post.id !== postId);
    setPosts(filteredPosts);
    await postService.deletePost(postId);
  };

  if (userLoading || postsLoading || friendsLoading) {
    return <Loading pageLoading={true} />;
  }

  return (
    <ProfileContext.Provider
      value={{
        profileContentType: contentType,
        user: userWrapper?.user!,
        userProfile: userWrapper?.userProfile!,
        userConfig: userWrapper?.userProfileConfig!,
        posts: posts,
        fetchNextPostPage,
        setProfileContentType: handleSetProfileContentType,
        friends,
        fetchNextFriendPage,
      }}
    >
      <ManagePostsContext.Provider
        value={{
          onAddPost: (post) => {
            throw new Error("It should not be used in profile components");
          },
          onDeletePost: handleDeletePost,
        }}
      >
        <div className={css["profile"]}>
          {header}
          {leftAside}
          {main}
        </div>
      </ManagePostsContext.Provider>
    </ProfileContext.Provider>
  );
}
