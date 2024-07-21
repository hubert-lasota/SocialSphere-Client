import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HomeNavbarRightSide from "./HomeNavbarRightSide";
import HomeSearchBar from "./HomeSearchBar";
import css from "./home.module.css";

export default function HomeNavbar() {
  return (
    <nav className={`${css["home__nav"]}`}>
      <div className={css["nav__left-side"]}>
        <Link to="/home">
          <FontAwesomeIcon icon={faS} size="2x" />
        </Link>
      </div>
      <HomeSearchBar /> 
      <HomeNavbarRightSide />
    </nav>
  );
}
