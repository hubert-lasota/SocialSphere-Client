import { Routes, Route,  } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

export default App
