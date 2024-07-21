import { useState } from "react";
import SubmitButton from "../../components/button/SubmitButton";
import EditableInput from "../../components/input/EditableInput/EditableInput";
import userService from "../../services/userService";
import { UserProfile } from "../../types/user.types";
import base64ToUint8Array from "../../utils/base64ToUint8Array";
import css from "./profile.module.css";

type ProfileMoreAboutProps = {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profilePicture: Uint8Array | null;
  isEditable?: boolean;
};

export default function ProfileMoreAbout(props: ProfileMoreAboutProps) {
  const { isEditable } = props;
  const [firstName, setFirstName] = useState<string>(props.firstName);
  const [lastName, setLastName] = useState<string>(props.lastName);
  const [city, setCity] = useState<string>(props.city);
  const [country, setCountry] = useState<string>(props.country);
  const [profilePicture, setProfilePicture] = useState<Uint8Array | null>(props.profilePicture);

  function handleSetFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleSetLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function handleSetCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  function handleSetCountry(e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(e.target.value);
  }

  async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    let formFirstName: FormDataEntryValue | string | null = formData.get("firstName");
    let formLastName: FormDataEntryValue | string | null = formData.get("lastName");
    let formCity: FormDataEntryValue | string | null = formData.get("city");
    let formCountry: FormDataEntryValue | string | null = formData.get("country");
    let formProfilePic: FormDataEntryValue | File | Uint8Array | null = formData.get("profilePicture");

    if (!formProfilePic) {
      formProfilePic = profilePicture as unknown as File;
    } else if ((formProfilePic as File).size < 1) {
      formProfilePic = profilePicture as unknown as File;
    }

    if (typeof formProfilePic === "string") {
      formProfilePic = base64ToUint8Array(formProfilePic);
    }

    const userProfile: UserProfile = {
      firstName: formFirstName as string,
      lastName: formLastName as string,
      city: formCity as string,
      country: formCountry as string,
      profilePicture: formProfilePic as Uint8Array | null,
    };

    userService.updateUserProfile(userProfile);
    window.location.reload();
  }

  return (
    <div className={`${css["main__more-about"]}`}>
      <div className={`${css["more-about__column-container"]}`}>
        <div className={`${css["more-about__column-key"]}`}>
          <div>First name</div>
          <div>Last name</div>
          <div>City</div>
          <div>Country</div>
          {isEditable ? <div>Add New Profile Picture</div> : <></>}
        </div>

        {isEditable ? (
          <form className={`${css["more-about__column-value"]}`} onSubmit={(e) => handleUpdateProfile(e)}>
            <EditableInput inputName="firstName" initialValue={firstName} setValue={handleSetFirstName} />
            <EditableInput inputName="lastName" initialValue={lastName} setValue={handleSetLastName} />
            <EditableInput inputName="city" initialValue={city} setValue={handleSetCity} />
            <EditableInput inputName="country" initialValue={country} setValue={handleSetCountry} />
            <input type="file" name="profilePicture" style={{ width: "100%" }} />
            <SubmitButton
              text="UPDATE"
              style={{
                width: "85%",
                padding: "1rem",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                transform: "translateX(-30%)",
                backgroundColor: "#150864",
                border: "1px solid #150864",
                boxShadow: "none",
              }}
            />
          </form>
        ) : (
          <div className={`${css["more-about__column-value"]}`}>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{city}</div>
            <div>{country}</div>
          </div>
        )}
      </div>
    </div>
  );
}
