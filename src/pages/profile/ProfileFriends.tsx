import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import useLocalStorage from "../../hooks/useLocalStorage";
import userService from "../../services/userService";
import { Friend, FriendPage } from "../../types/user.types";
import css from "./profile.module.css";
import { useNavigate } from "react-router-dom";

type ProfileFriendsProps = {
  userId: number;
};

export default function ProfileFriends(props: ProfileFriendsProps) {
  const userId = props.userId;
  const [currentUserId] = useLocalStorage("user_id", "");
  const [loading, setLoading] = useState<boolean>(true);
  const [showRelationshipStatus, setShowRelationshipStatus] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const navigate = useNavigate();

  async function handleFetchUserFriends(pageNumber: string) {
    const pageSize: string = "10";
    setLoading(true);
    let friendPage: FriendPage;
    if (userId === currentUserId) {
      friendPage = await userService.findMyFriends(pageNumber, pageSize);
      setShowRelationshipStatus(false);
    } else {
      friendPage = await userService.findUserFriends(userId.toString(), pageNumber, pageSize);
      setShowRelationshipStatus(true);
    }

    if (friendPage && friendPage.content) {
      const newFriends: Friend[] = [...friends, ...friendPage.content];
      setFriends(newFriends);
      setIsLastPage(friendPage.last);
    }

    setLoading(false);
  }

  useEffect(() => {
    handleFetchUserFriends("0");
  }, []);

  async function handleEndOfPage() {
    if (isLastPage) {
      return;
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const nextPageNumber = pageNumber + 1;
      setPageNumber(nextPageNumber);
      await handleFetchUserFriends(nextPageNumber.toString());
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleEndOfPage);

    return () => removeEventListener("scroll", handleEndOfPage);
  }, [friends]);

  function handleGoOnUserProfile(userId: number) {
    if(currentUserId === userId) {
      navigate("/me");
    } else {
      navigate(`/user/${userId}`);
      window.location.reload();
    }
  }

  return (
    <div className={css["main__show-friends"]}>
      {friends && friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <div key={friend.user.id} className={css["show-friends__friend-line"]}>
              <div className={css["friend-line__header"]}>
                <img
                  src={`data:image/png;base64,${friend.userProfile.profilePicture}`}
                  alt="profile"
                  className={css["friend-line__header__profile-picture"]}
                  onClick={() => handleGoOnUserProfile(friend.user.id)}
                />
                <div className={css["friend-line__header__user-details"]}>
                  <div className={css["header__user-details__name"]}>
                    <span>{friend.userProfile.firstName}</span>
                    <span>{friend.userProfile.lastName}</span>
                  </div>
                  {showRelationshipStatus ? (
                    <div className={css["header__user-details__status"]}>{friend.user.relationshipStatus}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>User has no friends</div>
      )}
      {loading ? <Loading className="small-loader" /> : <></>}
    </div>
  );
}
