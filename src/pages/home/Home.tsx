import "../../styles/home.css";
import "../../styles/loading.css";
import HomeMain from "./HomeMain";
import HomeNavbar from "./HomeNavbar";

export default function Home() {

  return (
    <div className="home home--bg-white">
      <HomeNavbar />
      <aside className="left-aside">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quisquam dolor aspernatur maiores labore tenetur! Unde praesentium fugiat eius repellat quia aliquam optio, necessitatibus aut, cupiditate repellendus numquam adipisci architecto!
      </aside>
      <HomeMain />
      <aside className="right-aside"></aside>
    </div>
  );
}
