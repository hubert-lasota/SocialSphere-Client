import { useState } from "react";
import Button from "../../components/button/Button";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import FileUploader from "../../components/file_uploader/FileUploader";
import EditableInput from "../../components/input/EditableInput/EditableInput";
import userService from "../../services/userService";
import { ProfilePrivacyLevel, UserProfile, UserProfileConfig } from "../../types/user.types";
import fileToBase64 from "../../utils/fileToBase64";
import { useProfileContext } from "./ProfileContext";
import css from "./profile.module.css";
import { width } from "@fortawesome/free-solid-svg-icons/faX";

type SettingsTab = "profile" | "config";

export default function MainSettings() {
  const [tab, setTab] = useState<SettingsTab>("profile");

  return (
    <div className={css["main__settings"]}>
      <div className={css["main__settings-container"]}>
        <div className={css["main__settings__header"]}>
          <div onClick={() => setTab("profile")} className={tab === "profile" ? css["main__settings__header--focus"] : ""}>
            Profile
          </div>
          <div onClick={() => setTab("config")} className={tab === "config" ? css["main__settings__header--focus"] : ""}>
            Configuration
          </div>
        </div>
        {tab === "profile" ? <MainSettingsProfile /> : <MainSettingsConfig />}
      </div>
    </div>
  );
}

function MainSettingsProfile() {
  const { userProfile } = useProfileContext();
  const [firstName, setFirstName] = useState<string>(userProfile.firstName);
  const [lastName, setLastName] = useState<string>(userProfile.lastName);
  const [city, setCity] = useState<string>(userProfile.city);
  const [country, setCountry] = useState<string>(userProfile.country);
  const [profilePicture, setProfilePicture] = useState<string | null>(userProfile.profilePicture);

  const handleFileUpload = (files: File[]) => {
    fileToBase64(files[0], false).then((val) => setProfilePicture(val));
  };

  const handleFileRemove = (fileIndex: number) => {
    setProfilePicture(userProfile.profilePicture);
  };

  const handleUpdate = () => {
    const newProfile: UserProfile = { firstName, lastName, city, country, profilePicture };
    userService.updateUserProfile(newProfile).finally(() => window.location.reload());
  };

  return (
    <div className={css["main__settings__profile"]}>
      <div className={css["settings__profile__field"]}>
        <span>First name</span>
        <EditableInput initialValue={firstName} setValue={(e) => setFirstName(e.target.value)} />
      </div>
      <div className={css["settings__profile__field"]}>
        <span>Last name</span>
        <EditableInput initialValue={lastName} setValue={(e) => setLastName(e.target.value)} />
      </div>
      <div className={css["settings__profile__field"]}>
        <span>City</span>
        <EditableInput initialValue={city} setValue={(e) => setCity(e.target.value)} />
      </div>
      <div className={css["settings__profile__field"]}>
        <span>Country</span>
        <EditableInput initialValue={country} setValue={(e) => setCountry(e.target.value)} />
      </div>
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <FileUploader onFilesUpload={handleFileUpload} onFileRemove={handleFileRemove} maxFiles={1} addFileMessage="Add new profile picture!" />
      </div>
      <Button styleType="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}

function MainSettingsConfig() {
  const { userConfig } = useProfileContext();
  const [profilePrivacyLevel, setProfilePrivacyLevel] = useState<ProfilePrivacyLevel>(userConfig.profilePrivacyLevel);
  const profilePrivacyLevelArr: ProfilePrivacyLevel[] = [ProfilePrivacyLevel.PRIVATE, ProfilePrivacyLevel.FRIENDS, ProfilePrivacyLevel.PUBLIC];

  const handleUpdate = () => {
    const newConfig: UserProfileConfig = {profilePrivacyLevel};
    userService.updateUserProfileConfig(newConfig).finally(() => window.location.reload());
  }

  return (
    <div className={css["main__settings__config"]}>
      <SelectDropdown
        header={profilePrivacyLevel}
        items={profilePrivacyLevelArr.map((privacyLevel) => {
          if (privacyLevel === profilePrivacyLevel) return <></>;
          return <div onClick={() => setProfilePrivacyLevel(privacyLevel)}>{privacyLevel}</div>;
        })}
      />
      <Button styleType="primary" additionalStyle={css["main__settings__config__btn"]} onClick={handleUpdate}>Update</Button>
    </div>
  );
}
