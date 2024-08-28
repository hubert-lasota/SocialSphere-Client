import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import HomeNavbarRightSide from "./HomeNavbarRightSide";
import HomeSearchBar from "./HomeSearchBar";
import css from "./home.module.css";

export default function HomeNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className={`${css["home__nav"]}`}>
      <div className={css["nav__left-side"]}>
        <div className={css["nav__left-side__logout"]} onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
        </div>
      </div>
      <HomeSearchBar />
      <HomeNavbarRightSide />
    </nav>
  );
}
