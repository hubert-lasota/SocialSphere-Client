import { FiMessageCircle } from "react-icons/fi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import css from "./home.module.css";
import { useNavigate } from "react-router-dom";

export default function LeftAside() {
  const navigate = useNavigate();

  return (
    <aside className={css["left-aside"]}>
      <div className={css["left-aside__logo"]} onClick={() => location.reload()}>
        SOCIAL SPHERE
      </div>
      <div className={css["left-aside__btns"]}>
        <div onClick={() => navigate("/chat")}>
          <div className={css["left-aside__btns__messages-icon"]}>
            <FiMessageCircle />
          </div>
          <div className={css["left-aside__btns__messages-text"]}>Messages</div>
        </div>
        <div>
          <div className={css["left-aside__btns__friends-icon"]}><LiaUserFriendsSolid /></div>
          <div className={css["left-aside__btns__friends-text"]}>Friends</div>
        </div>
      </div>
    </aside>
  );
}
