import { Navigate, Route, Routes } from "react-router-dom";
import "../src/css/global.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/not_found/NotFound";
import MyProfile from "./pages/profile/MyProfile";
import UserProfile from "./pages/profile/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/me" element={<MyProfile />} />
      </Route>
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
