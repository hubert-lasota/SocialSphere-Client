import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/home/Home";
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
