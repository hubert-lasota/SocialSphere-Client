import { useState } from "react";
import Button from "../../components/button/Button";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { SearchFriendsRelationshipStatus, SearchFriendsRequest } from "../../types/user.types";
import css from "./friends.module.css";
import HomeNavigateButton from "../../components/button/HomeNavigateButton";

type HeaderProps = {
  onSearchFriends: (searchFriendsRequest: SearchFriendsRequest) => void;
};

export default function Header(props: HeaderProps) {
  const { onSearchFriends } = props;
  const [firstNamePattern, setFirstNamePattern] = useState<string>("");
  const [lastNamePattern, setLastNamePattern] = useState<string>("");
  const [cityPattern, setCityPattern] = useState<string>("");
  const [countryPattern, setCountryPattern] = useState<string>("");
  const [relationshipStatus, setRelationshipStatus] = useState<SearchFriendsRelationshipStatus>(SearchFriendsRelationshipStatus.STRANGER);
  const relationshipStatusArr = [
    SearchFriendsRelationshipStatus.STRANGER,
    SearchFriendsRelationshipStatus.FRIENDS,
    SearchFriendsRelationshipStatus.ALL,
  ];

  return (
    <header className={css["header"]}>
      <input
        placeholder="First name"
        className={css["header__input"]}
        value={firstNamePattern}
        onChange={(e) => setFirstNamePattern(e.target.value)}
      />
      <input placeholder="Last name" className={css["header__input"]} value={lastNamePattern} onChange={(e) => setLastNamePattern(e.target.value)} />
      <input placeholder="City" className={css["header__input"]} value={cityPattern} onChange={(e) => setCityPattern(e.target.value)} />
      <input placeholder="Country" className={css["header__input"]} value={countryPattern} onChange={(e) => setCountryPattern(e.target.value)} />
      <SelectDropdown
        additionalStyle={{ width: "14%" }}
        header={<div>{relationshipStatus}</div>}
        items={relationshipStatusArr.map((status) => {
          if (status === relationshipStatus) return <></>;
          return <div onClick={() => setRelationshipStatus(status)}>{status}</div>;
        })}
      />
      <Button
        styleType="primary"
        additionalStyle={css["header__btn"]}
        onClick={() => onSearchFriends({ firstNamePattern, lastNamePattern, cityPattern, countryPattern, relationshipStatus })}
      >
        Search
      </Button>
      <HomeNavigateButton additionalClassName={css["header__home-btn"]}/>
    </header>
  );
}
