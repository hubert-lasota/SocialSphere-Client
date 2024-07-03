import "../../styles/home.css";
import "../../styles/loading.css";
import HomeLeftAside from "./HomeLeftAside";
import HomeMain from "./HomeMain";
import HomeNavbar from "./HomeNavbar";
import HomeRightAside from "./HomeRightAside";

export default function Home() {

  return (
    <div className="home home--bg-white">
      <HomeNavbar />
      <HomeLeftAside />
      <HomeMain />
      <HomeRightAside />
    </div>
  );
}
