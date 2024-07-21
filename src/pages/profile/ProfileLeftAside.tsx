import { useState } from "react";
import css from "./profile.module.css";

type ProfileLeftAsideProps = {
  handleSetIsShowPosts: (value: boolean) => void;
  handleSetIsShowFriends: (value: boolean) => void
  handleSetIsMoreAbout: (value: boolean) => void;
  isSettingsComponentAvailable: boolean;
  handleSetIsSettings?: (value: boolean) => void;
};

export default function ProfileLeftAside(props: ProfileLeftAsideProps) {
  const { handleSetIsShowPosts, handleSetIsShowFriends, handleSetIsMoreAbout, handleSetIsSettings, isSettingsComponentAvailable } = props;
  const [showPostsFocusClassName, setShowPostsFocusClassName] = useState<string>(css["profile__left-aside--focus"]);
  const [showFriendsFocusClassName, setShowFriendsFocusClassName] = useState<string>("");
  const [moreAboutFocusClassName, setMoreAboutFocusClassName] = useState<string>("");
  const [settingsFocusClassName, setSettingsFocusClassName] = useState<string>("");

  function handleClickShowPosts() {
    setShowPostsFocusClassName(css["profile__left-aside--focus"]);
    setShowFriendsFocusClassName("");
    setMoreAboutFocusClassName("");
    setSettingsFocusClassName("");
    handleSetIsShowPosts(true);
    handleSetIsShowFriends(false);
    handleSetIsMoreAbout(false);
    handleSetIsSettings?.(false);
  }

  function handleClickShowFriends() {
    setShowFriendsFocusClassName(css["profile__left-aside--focus"]);
    setShowPostsFocusClassName("");
    setMoreAboutFocusClassName("");
    setSettingsFocusClassName("");
    handleSetIsShowFriends(true);
    handleSetIsShowPosts(false);
    handleSetIsMoreAbout(false);
    handleSetIsSettings?.(false);
  }

  function handleClickMoreAbout() {
    setMoreAboutFocusClassName(css["profile__left-aside--focus"]);
    setShowPostsFocusClassName("");
    setShowFriendsFocusClassName("");
    setSettingsFocusClassName("");
    handleSetIsMoreAbout(true);
    handleSetIsShowPosts(false);
    handleSetIsShowFriends(false);
    handleSetIsSettings?.(false);
  }

  function handleClickSettings() {
    setSettingsFocusClassName(css["profile__left-aside--focus"]);
    setShowPostsFocusClassName("");
    setShowFriendsFocusClassName("");
    setMoreAboutFocusClassName("");
    handleSetIsSettings?.(true);
    handleSetIsMoreAbout(false);
    handleSetIsShowFriends(false);
    handleSetIsShowPosts(false);
  }

  return (
    <aside className={`${css["profile__left-aside"]}`}>
      <div className={`${css["left-aside__show-posts"]} ${showPostsFocusClassName}`} onClick={() => handleClickShowPosts()}>
        Posts
      </div>
      <div className={`${css["left-aside__show-friends"]} ${showFriendsFocusClassName}`} onClick={() => handleClickShowFriends()}>Friends</div>
      <div className={`${css["left-aside__more-about"]} ${moreAboutFocusClassName}`} onClick={() => handleClickMoreAbout()}>
        Informations
      </div>
      {isSettingsComponentAvailable ? (
        <div className={`${css["left-aside__settings"]}  ${settingsFocusClassName}`} onClick={() => handleClickSettings()}>
          Settings
        </div>
      ) : (
        <></>
      )}
    </aside>
  );
}
