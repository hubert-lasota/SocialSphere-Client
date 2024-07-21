import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SubmitButton from "../../components/button/SubmitButton";
import userService from "../../services/userService";
import { ProfilePrivacyLevel, UserProfileConfig } from "../../types/user.types";
import css from "./profile.module.css";

type ProfileSettingsProps = {
  userProfileConfig: UserProfileConfig;
};

export default function ProfileSettings(props: ProfileSettingsProps) {
  const { userProfileConfig } = props;
  const [privacyLevelInitial, setPrivacyLevelInitial] = useState<string>("");
  const [privacyLevelSecondOption, setPrivacyLevelSecondOption] = useState<string>("");
  const [privacyLevelThirdOption, setPrivacyLevelThirdOption] = useState<string>("");

  useEffect(() => {
    handleSetPrivacyLevelOptions();
  }, [privacyLevelInitial]);

  function handleSetPrivacyLevelOptions() {
    const privacyLevel: ProfilePrivacyLevel = userProfileConfig.profilePrivacyLevel;
    setPrivacyLevelInitial(privacyLevel);
    if (privacyLevel === "PUBLIC") {
      setPrivacyLevelSecondOption("PRIVATE");
      setPrivacyLevelThirdOption("FRIENDS");
    } else if (privacyLevel === "PRIVATE") {
      setPrivacyLevelSecondOption("PUBLIC");
      setPrivacyLevelThirdOption("FRIENDS");
    } else if (privacyLevel === "FRIENDS") {
      setPrivacyLevelSecondOption("PUBLIC");
      setPrivacyLevelThirdOption("PRIVATE");
    }
  }

  function handleUpdateSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const privacyLevel = formData.get("privacy-level") as ProfilePrivacyLevel;
    userService.updateUserProfileConfig({ profilePrivacyLevel: privacyLevel });
    window.location.reload();
  }

  return (
    <form
      className={`${css["main__settings"]}`}
      onSubmit={(e) => handleUpdateSettings(e)}
    >
      <div className={`${css["settings__privacy-level"]}`}>
        <label htmlFor="privacy-level" className={`${css["privacy-level__label"]}`}>
          Privacy level
        </label>
        <select name="privacy-level" className={`${css["privacy-level__select"]}`}>
          <option value={privacyLevelInitial}>{privacyLevelInitial}</option>
          <option value={privacyLevelSecondOption}>{privacyLevelSecondOption}</option>
          <option value={privacyLevelThirdOption}>{privacyLevelThirdOption}</option>
        </select>
        <div className={`${css["privacy-level__icon-container"]}`}>
          <FontAwesomeIcon icon={faCaretDown} className={`${css["privacy-level__icon-container__icon"]}`} />
        </div>
      </div>

      <SubmitButton text="UPDATE" style={{ width: "40%", marginTop: "2rem", fontSize: "1.1rem", padding: "1rem", borderRadius: "10px" }} />
    </form>
  );
}
