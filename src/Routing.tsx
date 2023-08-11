import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function Routing() {
  return (
    <Routes>
      <Route path="/home/index" element={<Home />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default Routing;
