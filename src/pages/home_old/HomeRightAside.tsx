import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { Friend } from "../../types/user.types";
import { useNavigate } from "react-router-dom";
import css from "./home.module.css";
import { DataResult, Page } from "../../types/common.types";

export default function HomeRightAside() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  async function handleFetchFriends() {
    const response: DataResult<Page<Friend>> = await userService.findMyFriends("0", "5");
    if(response.success) {
      const newFriends = response.data.content;
      setFriends(newFriends);
    }
  }

  useEffect(() => {
    handleFetchFriends();
  }, []);

  function handleGoOnUserPage(userId: number) {
    navigate(`/user/${userId}`);
  }

  return (
    <aside className={`${css["home__right-aside"]}`}>
      <div className={css["right-aside__friends"]}>
        <div className={`${css["friends__header"]}`}>
          Friends
        </div>
        {friends.length > 0 ? (
          friends.map((friend) => {
            const profilePicutreUrl: string = `data:image/png;base64,${friend.userProfile.profilePicture}`;

            return (
              <div
                key={friend.user.id}
                className={css["friends__line"]}
                onClick={() => handleGoOnUserPage(friend.user.id)}
              >
                <img
                  src={profilePicutreUrl}
                  alt="profile"
                  className={css["friends__line__profile-picture"]}
                />
                <div className={css["friends__line__name"]}>
                  <span className={`${css["friends__line__name__first-name"]}`}>
                    {friend.userProfile.firstName}
                  </span>
                  <span className={`${css["friends__line__name__last-name"]}`}>
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
