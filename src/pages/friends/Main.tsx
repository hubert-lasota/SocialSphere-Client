import { useRef } from "react";
import Loading from "../../components/loading/Loading";
import UserCard from "../../components/user/UserCard";
import { UserWithProfile } from "../../types/user.types";
import css from "./friends.module.css";

type MainProps = {
  friends: UserWithProfile[];
  loading: boolean;
  onFetchNextFriendsPage: () => void;
};

export default function Main(props: MainProps) {
  const { friends, loading, onFetchNextFriendsPage } = props;
  const mainRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    if(!mainRef.current) return;
    const {scrollTop, clientHeight, scrollHeight } = mainRef.current;
    if(scrollTop + clientHeight >= scrollHeight) {
      onFetchNextFriendsPage();
    }
  }

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
        <Loading additionalStyle={{ width: "10%", marginBottom: "10rem" }} />
      </div>
    );
  }

  return (
    <main className={css["main"]} onScroll={handleScroll} ref={mainRef}>
      {friends.map((friend) => (
        <UserCard
          userWithProfile={friend}
          profile={<UserCard.Profile />}
          details={
            <>
              <UserCard.Name />
              <UserCard.From />
              <UserCard.RelationshipStatus />
            </>
          }
        />
      ))}
    </main>
  );
}
