import { ReactNode } from "react";
import Post from "../../components/post/Post";
import UserCard from "../../components/user/UserCard";
import MainSettings from "./MainSettings";
import css from "./profile.module.css";
import { useProfileContext } from "./ProfileContext";

type MainProps = {
  friendsDetails?: ReactNode;
};

export default function Main(props: MainProps) {
  const { friendsDetails } = props;
  const { posts, fetchNextPostPage, profileContentType, friends, fetchNextFriendPage } = useProfileContext();

  const handleEndOfPage = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (profileContentType === "posts") fetchNextPostPage();
      if (profileContentType === "friends") fetchNextFriendPage();
    }
  };

  return (
    <main className={css["main"]} onScroll={handleEndOfPage}>
      {profileContentType === "posts" && (
        <div className={css["main__posts"]}>
          {posts.map((post) => (
            <Post post={post} additionalStyle={{ padding: "1rem" }} key={post.id} />
          ))}
        </div>
      )}
      {profileContentType === "friends" && (
        <div className={css["main__friends"]}>
          {friends.map((friend) => (
            <UserCard userWithProfile={friend} profile={<UserCard.Profile />} details={friendsDetails} key={friend.user.id} />
          ))}
        </div>
      )}
      {profileContentType === "settings" && <MainSettings />}
    </main>
  );
}
