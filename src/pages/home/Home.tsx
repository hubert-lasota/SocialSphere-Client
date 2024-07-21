import HomeLeftAside from "./HomeLeftAside";
import HomeMain from "./HomeMain";
import HomeNavbar from "./HomeNavbar";
import HomeRightAside from "./HomeRightAside";
import css from "./home.module.css";

export default function Home() {
  return (
    <div className={`${css["home"]}`}>
      <HomeNavbar />
      <HomeLeftAside />
      <HomeMain />
      <HomeRightAside />
    </div>
  );
}
