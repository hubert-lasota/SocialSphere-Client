import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HomeNavbarRightSide from "./HomeNavbarRightSide";
import HomeSearchBar from "./HomeSearchBar";
import styles from "./home.module.css";

export default function HomeNavbar() {
  return (
    <nav className={`${styles["home__nav"]} ${styles["home__nav--bg-white"]} ${styles["home__nav--brd-btm-grey"]}`}>
      <div className={styles["nav__left-side"]}>
        <Link to="/home">
          <FontAwesomeIcon icon={faS} size="3x" />
        </Link>
      </div>
      <HomeSearchBar /> 
      <HomeNavbarRightSide />
    </nav>
  );
}
