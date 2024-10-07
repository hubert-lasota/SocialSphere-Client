import { ReactNode } from "react";
import css from "./profile.module.css";
import { useProfileContext } from "./ProfileContext";

type LeftAsideProps = {
  children: ReactNode;
};

export default function LeftAside(props: LeftAsideProps) {
  const { children } = props;
  return (
    <aside className={css["left-aside"]}>
      <div className={css["left-aside-container"]}>{children}</div>
    </aside>
  );
}

LeftAside.PostsButton = function LeftAsidePostsButton() {
  const { setProfileContentType, profileContentType } = useProfileContext();
  const focusClassName = profileContentType === "posts" ? css["left-aside__btn--focus"] : " ";
  return (
    <div className={css["left-aside__btn"] + " " + focusClassName} onClick={() => setProfileContentType("posts")}>
      Posts
    </div>
  );
};

LeftAside.FriendsButton = function LeftAsideFriendsButton() {
  const { setProfileContentType, profileContentType } = useProfileContext();
  const focusClassName = profileContentType === "friends" ? css["left-aside__btn--focus"] : " ";
  return (
    <div className={css["left-aside__btn"] + " " + focusClassName} onClick={() => setProfileContentType("friends")}>
      Friends
    </div>
  );
};

LeftAside.SettingsButton = function LeftAsideSettingsButton() {
  const { setProfileContentType, profileContentType } = useProfileContext();
  const focusClassName = profileContentType === "settings" ? css["left-aside__btn--focus"] : " ";
  return (
    <div className={css["left-aside__btn"] + " " + focusClassName} onClick={() => setProfileContentType("settings")}>
      Settings
    </div>
  );
};
