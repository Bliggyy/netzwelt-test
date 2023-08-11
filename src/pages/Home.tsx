import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const initialUser = {
    username: "",
    displayName: "",
    roles: [],
    isAuthenticated: false,
  };

  const getUser = JSON.parse(
    localStorage.getItem("user") || JSON.stringify(initialUser)
  );

  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user.isAuthenticated === true) {
      navigate("/home/index");
    } else if (user.isAuthenticated === false) {
      navigate("/account/login");
    }
  }, []);

  return (
    <>
      <h1 className="text-center">Welcome to Home Page</h1>
    </>
  );
}

export default Home;
