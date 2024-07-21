import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import PostList from "../../components/Post/PostList";
import postService from "../../services/postService";
import { Post } from "../../types/post.types";
import { UserProfileConfig, UserResponse } from "../../types/user.types";
import css from "./profile.module.css";
import ProfileMoreAbout from "./ProfileMoreAbout";
import ProfileSettings from "./ProfileSettings";
import ProfileFriends from "./ProfileFriends";

type ProfileMainProps = {
  userId?: number;
  user: UserResponse;
  isShowPosts: boolean;
  isMoreAbout: boolean;
  isShowFriends: boolean;
  isMoreAboutEditable?: boolean;
  isSettings?: boolean;
};

export default function ProfileMain(props: ProfileMainProps) {
  const { userId, user, isShowPosts, isMoreAbout, isShowFriends, isMoreAboutEditable, isSettings } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleFetchUserPosts(pageNumber: string) {
    setLoading(true);
    let id: string | undefined = undefined;
    if (userId) id = userId.toString();
    const postPage = await postService.findUserPostPage(pageNumber, "5", id);
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
    <main className={css["profile__main"]}>
      {isShowPosts ? <PostList posts={posts} /> : <></>}
      {loading ? <Loading className="post-loader" /> : <></>}
      {isMoreAbout ? (
        <ProfileMoreAbout
          firstName={user.userProfile.firstName}
          lastName={user.userProfile.lastName}
          city={user.userProfile.city}
          country={user.userProfile.country}
          profilePicture={user.userProfile.profilePicture as Uint8Array}
          isEditable={isMoreAboutEditable}
        />
      ) : (
        <></>
      )}
      {isShowFriends ? <ProfileFriends userId={user?.user.id}/> : <></>}
      {isSettings ? <ProfileSettings userProfileConfig={user.userProfileConfig as UserProfileConfig} /> : <></>}
    </main>
  );
}
