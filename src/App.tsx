import { Navigate, Route, Routes } from "react-router-dom";
import "../src/css/global.css";
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/not_found/NotFound";
import MyProfile from "./pages/profile/MyProfile";
import UserProfile from "./pages/profile/UserProfile";
import SignUpLogin from "./pages/sign_up/SignUpLogin";
import SignUpProfile from "./pages/sign_up/SignUpProfile";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpLogin />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/sign-up/profile" element={<SignUpProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/me" element={<MyProfile />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
