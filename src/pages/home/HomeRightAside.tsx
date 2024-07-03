import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { Friend, FriendPage } from "../../types/user.types";
import { useNavigate } from "react-router-dom";

export default function HomeRightAside() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  async function handleFetchFriends() {
    const friendPage: FriendPage = await userService.findMyFriends("0", "10");
    if (friendPage.content) {
      setFriends(friendPage.content);
    }
  }

  useEffect(() => {
    handleFetchFriends();
  }, []);

  function handleGoOnUserPage(userId: number) {
    navigate(`/user/${userId}`);
  }

  return (
    <aside className="home__right-aside">
      <div className="home__right-aside__friends">
        <div className="home__right-aside__friends-header home__right-aside__friends-header--fslg">
          Friends
        </div>
        {friends.length > 0 ? (
          friends.map((friend) => {
            const profilePicutreUrl: string = `data:image/png;base64,${friend.userProfile.profilePicture}`;

            return (
              <div
                key={friend.user.id}
                className="home__right-aside__friends-line"
                onClick={() => handleGoOnUserPage(friend.user.id)}
              >
                <img
                  src={profilePicutreUrl}
                  alt="profile"
                  className="right-aside__friends-profile-picture"
                />
                <div className="right-aside__friends-name">
                  <span className="right-aside__friends-first-name right-aside__friends-first-name--fsmd">
                    {friend.userProfile.firstName}
                  </span>
                  <span className="right-aside__friends-last-name right-aside__friends-last-name--fsmd">
                    {friend.userProfile.lastName}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </aside>
  );
}
