import "../../styles/home.css";
import HomeMain from "./HomeMain";
import HomeNavbar from "./HomeNavbar";

export default function Home() {

  return (
    <div className="home home--bg-white">
      <HomeNavbar />
      <aside className="left-aside"></aside>
      <HomeMain />
      <aside className="right-aside"></aside>
    </div>
  );
}
