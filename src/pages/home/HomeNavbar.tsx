import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HomeHeaderRightSide from "./HomeNavbarRightSide";
import HomeSearchBar from "./HomeSearchBar";

export default function HomeNavbar() {
  return (
    <nav className="home__nav home__nav--bg-white home__nav--brd-btm-grey">
      <div className="home__nav-left">
        <Link to="/home">
          <FontAwesomeIcon icon={faS} size="3x" />
        </Link>
      </div>
      <HomeSearchBar />
      <HomeHeaderRightSide />
    </nav>
  );
}
