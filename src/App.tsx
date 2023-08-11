import "./App.css";
import Routing from "./Routing";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUser = {
  username: "",
  displayName: "",
  roles: [],
  isAuthenticated: false,
};

function App() {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserState();
    if (user.isAuthenticated === false) {
      navigate("/account/login");
    } else if (user.isAuthenticated === true) {
      navigate("home/index");
    }
  }, []);

  const checkUserState = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user !== "{}") {
      setUser(user);
    }
  };

  return (
    <div className="App mt-5">
      <Routing />
    </div>
  );
}

export default App;
