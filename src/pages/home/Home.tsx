import HomeLeftAside from "./HomeLeftAside";
import HomeMain from "./HomeMain";
import HomeNavbar from "./HomeNavbar";
import HomeRightAside from "./HomeRightAside";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={`${styles["home"]} ${styles["home--bg-white"]}`}>
      <HomeNavbar />
      <HomeLeftAside />
      <HomeMain />
      <HomeRightAside />
    </div>
  );
}
