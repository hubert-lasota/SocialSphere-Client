import "../../styles/home.css";
import HomeHeader from "./HomeNavbar";

export default function Home() {

  return (
    <div className="home home--bg-white">
      <HomeHeader />
      <aside className="left-aside"></aside>
      <main className="main"></main>
      <aside className="right-aside"></aside>
    </div>
  );
}
