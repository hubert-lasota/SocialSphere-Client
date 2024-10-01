import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../components/button/Button";
import CredentialInput from "../../components/input/credential_input/CredentialInput";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuthServie from "../../services/useAuthService";
import css from "./sign-up.module.css";
import SignUp from "./SignUp";
import WarningMessage from "./WarningMessage";

type WarningMessageType = "differentPasswords" | "loginIsNotValid" | "passwordIsNotValid" | "";

export default function SignUpLogin() {
  const authService = useAuthServie();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTemp, setPasswordTemp] = useState<string>("");
  const [warning, setWarning] = useState<WarningMessageType>("");
  const [warningText, setWarningText] = useState<string>("");
  const [, setJwt] = useLocalStorage("jwt", "");
  const [, setUserId] = useLocalStorage("user_id", "");
  const [, setUsernameItem] = useLocalStorage("username", "");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleCreateAccount = () => {
    if (password !== passwordTemp) {
      setWarning("differentPasswords");
      return;
    }

    authService.createLogin({ username, password }).then((response) => {
      if (response.success) {
        const loginResponse = response.data;
        setJwt(loginResponse.jwt);
        setUserId(loginResponse.userId);
        setUsernameItem(loginResponse.username);
        setIsSuccess(true);
      } else {
        if (response.errorMessage.startsWith("Username")) {
          setWarning("loginIsNotValid");
        } else {
          setWarning("passwordIsNotValid");
        }
        setWarningText(response.errorMessage);
      }
    });
  };

  return (
    <>
      <SignUp>
        <div className={css["login"]}>
          <div className={css["login-container"]}>
            <div className={css["login__header"]}>Create account!</div>
            <div className={css["login__fields"]}>
              <CredentialInput
                inputValue={username}
                onChangeInputValue={(e) => setUsername(e.target.value)}
                type="username"
                inputContainerStyle={{ width: "100%" }}
                inputStyle={{ padding: "0.7rem" }}
              />
              {warning === "loginIsNotValid" && <WarningMessage message={warningText} />}
              <CredentialInput
                inputValue={password}
                onChangeInputValue={(e) => setPassword(e.target.value)}
                type="password"
                inputContainerStyle={{ width: "100%" }}
                inputStyle={{ padding: "0.7rem" }}
              />
              {warning === "passwordIsNotValid" && <WarningMessage message={warningText} />}
              <CredentialInput
                inputValue={passwordTemp}
                onChangeInputValue={(e) => setPasswordTemp(e.target.value)}
                type="password"
                inputContainerStyle={{ width: "100%" }}
                inputStyle={{ padding: "0.7rem" }}
                placeholder="Write your password again"
              />
              {warning === "differentPasswords" && <WarningMessage message="Passwords are not the same" />}
              <Button styleType="primary" additionalStyle={css["login__btn"]} onClick={handleCreateAccount}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </SignUp>
      {isSuccess && <Navigate to={"/sign-up/profile"} />}
    </>
  );
}
