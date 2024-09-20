import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropdown/Dropdown";
import css from "./home.module.css";
import SearchBar from "./SearchBar";
import useLogout from "./useLogout";

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <header className={css["header"]}>
      <SearchBar />
      <Dropdown header={<Dropdown.HeaderUserProfileImg />} additionalStyle={{marginRight: "6rem"}}>
          <div onClick={() => navigate("/me")}>Profile</div>
          <div onClick={logout}>Logout</div>
      </Dropdown>
    </header>
  );
}
