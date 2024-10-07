import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import FileUploader from "../../components/file_uploader/FileUploader";
import useUserService from "../../services/useUserService";
import { ProfilePrivacyLevel, UserProfileRequest } from "../../types/user.types";
import css from "./sign-up.module.css";
import SignUp from "./SignUp";
import WarningMessage from "./WarningMessage";

type WarningMessageType = "firstNameIsNotValid" | "lastNameIsNotValid" | "cityIsNotValid" | "countryIsNotValid" | "";

export default function SignUpProfile() {
  const userService = useUserService();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [warningMessageType, setWarningMessageType] = useState<WarningMessageType>("");
  const [warningText, setWarningText] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    const request: UserProfileRequest = { firstName, lastName, city, country };

    userService.createProfile(request, profilePicture).then((response) => {
      if (response.success) {
        userService.createProfileConfig({ profilePrivacyLevel: ProfilePrivacyLevel.PUBLIC }).then((response) => {
          if (response.success) {
            navigate("/home");
          }
        });
      } else {
        const errorMessage = response.errorMessage;
        if (errorMessage.startsWith("First name")) {
          setWarningMessageType("firstNameIsNotValid");
        } else if (errorMessage.startsWith("Last name")) {
          setWarningMessageType("lastNameIsNotValid");
        } else if (errorMessage.startsWith("City")) {
          setWarningMessageType("cityIsNotValid");
        } else if (errorMessage.startsWith("Country")) {
          setWarningMessageType("countryIsNotValid");
        }
        setWarningText(errorMessage);
      }
    });
  };

  const handleUploadProfilePicture = (files: File[]) => {
    setProfilePicture(files[0]);
  };

  const handleRemoveProfilePicture = (fileIndex: number) => {
    setProfilePicture(null);
  };

  return (
    <SignUp>
      <div className={css["profile"]}>
        <div className={css["profile-container"]}>
          <div className={css["profile__header"]}>Create Profile</div>
          <div className={css["profile__fields"]}>
            <input placeholder="First name" className={css["fields__input"]} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {warningMessageType === "firstNameIsNotValid" && <WarningMessage message={warningText} />}
            <input placeholder="Last name" className={css["fields__input"]} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {warningMessageType === "lastNameIsNotValid" && <WarningMessage message={warningText} />}
            <input placeholder="City" className={css["fields__input"]} value={city} onChange={(e) => setCity(e.target.value)} />
            {warningMessageType === "cityIsNotValid" && <WarningMessage message={warningText} />}
            <input placeholder="Country" className={css["fields__input"]} value={country} onChange={(e) => setCountry(e.target.value)} />
            {warningMessageType === "countryIsNotValid" && <WarningMessage message={warningText} />}
            <FileUploader
              maxFiles={1}
              onFileRemove={handleRemoveProfilePicture}
              onFilesUpload={handleUploadProfilePicture}
              addFileMessage="Add profile picture"
              additionalStyle={warningMessageType === "" ? { width: "400px" } : { width: "100%" }}
            />
            <Button styleType="primary" additionalStyle={css["profile__btn"]} onClick={handleCreateProfile}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </SignUp>
  );
}
