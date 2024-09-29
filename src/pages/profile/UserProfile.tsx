import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import UserCard from "../../components/user/UserCard";
import userService from "../../services/userService";
import Header from "./Header";
import LeftAside from "./LeftAside";
import Main from "./Main";
import Profile from "./Profile";

export default function UserProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const isAllowedTemp = useRef<boolean>(isAllowed);
  const [isWaitingForFriendResponse, setIsWaitingForFriendResponse] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    userService
      .isCurrentUserHasPermissionToCheckProfile(parseInt(id!))
      .then((response) => {
        if (response.success) {
          setIsAllowed(response.data);
          isAllowedTemp.current = response.data;
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setLoading(true);
    userService
      .isUserWaitingForCurrentUserFriendResponse(parseInt(id!))
      .then((response) => {
        if (response.success) {
          setIsWaitingForFriendResponse(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    <Loading pageLoading={true} />;
  }

  if (!isAllowedTemp.current) {
    return (
      <Profile
        userId={parseInt(id!)}
        header={
          <Header>
            {isWaitingForFriendResponse ? <Header.FriendResponseButton /> : <Header.FriendButton />}
            <Header.HomeNavigateButton />
          </Header>
        }
      />
    );
  }

  return (
    <Profile
      userId={parseInt(id!)}
      header={
        <Header>
          {isWaitingForFriendResponse ? <Header.FriendResponseButton /> : <Header.FriendButton />}
          <Header.HomeNavigateButton />
        </Header>
      }
      leftAside={
        <LeftAside>
          <LeftAside.PostsButton />
          <LeftAside.FriendsButton />
        </LeftAside>
      }
      main={
        <Main
          friendsDetails={
            <>
              <UserCard.Name /> <UserCard.From /> <UserCard.RelationshipStatus />
            </>
          }
        />
      }
    />
  );
}
