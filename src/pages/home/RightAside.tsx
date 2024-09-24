import { useState } from "react";
import FriendNotification from "./FriendNotification";
import css from "./home.module.css";
import PostNotification from "./PostNotification";
import useFetchAndSubscribeFriendRequestNotifications from "./useFetchAndSubscribeFriendRequestNotifications";
import useFetchAndSubscribePostNotifications from "./useFetchAndSubscribePostNotifications";

type ButtonFocus = "friends" | "posts";

export default function RightAside() {
  const [buttonFocus, setButtonFocus] = useState<ButtonFocus>("friends");
  const { friendNotifications } = useFetchAndSubscribeFriendRequestNotifications();
  const { postNotifications } = useFetchAndSubscribePostNotifications();

  return (
    <aside className={css["right-aside"]}>
      <div className={css["right-aside-container"]}>
        <div className="flex flex-column row-gap-medium" style={{ userSelect: "none" }}>
          <div className={css["right-aside__notification-header"]}>Notifications</div>
          <div className={css["right-aside__btns"]}>
            <button className={buttonFocus === "friends" ? css["right-aside__btn-focus"] : ""} onClick={() => setButtonFocus("friends")}>
              Friends
            </button>
            <button className={buttonFocus === "posts" ? css["right-aside__btn-focus"] : ""} onClick={() => setButtonFocus("posts")}>
              Posts
            </button>
          </div>
        </div>
        <div className="flex flex-column row-gap-small">
          {buttonFocus === "friends"
            ? friendNotifications.map((notification) => <FriendNotification notification={notification} key={notification.id} />)
            : postNotifications.map((notifictaion) => <PostNotification notification={notifictaion} key={notifictaion.id} />)}
        </div>
      </div>
    </aside>
  );
}
