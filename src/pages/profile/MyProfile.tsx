import UserCard from "../../components/user/UserCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import Header from "./Header";
import LeftAside from "./LeftAside";
import Main from "./Main";
import Profile from "./Profile";

export default function MyProfile() {
  const [currentUserId] = useLocalStorage("user_id", "");

  return (
    <Profile
      userId={currentUserId}
      header={
        <Header>
          <Header.HomeNavigateButton />
        </Header>
      }
      leftAside={
        <LeftAside>
          <LeftAside.PostsButton />
          <LeftAside.FriendsButton />
          <LeftAside.SettingsButton />
        </LeftAside>
      }
      main={
        <Main
          friendsDetails={
            <>
              <UserCard.Name /> <UserCard.From />
            </>
          }
        />
      }
    />
  );
}
