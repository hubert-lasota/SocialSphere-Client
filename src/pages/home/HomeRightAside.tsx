import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { Friend, FriendPage } from "../../types/user.types";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

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
    <aside className={`${styles["home__right-aside"]} ${styles["home__right-aside--bgcolor-white"]}`}>
      <div className={styles["right-aside__friends"]}>
        <div className={`${styles["friends__header"]} ${styles["friends__header--fslg"]}`}>
          Friends
        </div>
        {friends.length > 0 ? (
          friends.map((friend) => {
            const profilePicutreUrl: string = `data:image/png;base64,${friend.userProfile.profilePicture}`;

            return (
              <div
                key={friend.user.id}
                className={styles["friends__line"]}
                onClick={() => handleGoOnUserPage(friend.user.id)}
              >
                <img
                  src={profilePicutreUrl}
                  alt="profile"
                  className={styles["friends__line__profile-picture"]}
                />
                <div className={styles["friends__line__name"]}>
                  <span className={`${styles["friends__line__name__first-name"]} ${styles["friends__line__name__first-name--fsmd"]}`}>
                    {friend.userProfile.firstName}
                  </span>
                  <span className={`${styles["friends__line__name__last-name"]} ${styles["friends__line__name__last-name--fsmd"]}`}>
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
