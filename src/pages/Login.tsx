import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialUser = {
  username: "",
  displayName: "",
  roles: [],
  isAuthenticated: false,
};

function Login() {
  const [user, setUser] = useState(initialUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkUserState();
    if (user.isAuthenticated === true) {
      navigate("home/index");
    }
  }, []);

  const checkUserState = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user !== "{}") {
      setUser(user);
    }
  };

  const login = (username: String, password: String) => {
    console.log(username + " " + password);
  };

  const handleEvent = (e: any) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div className="container border p-4">
        <h1 className="mb-4">Welcome to Login Page</h1>
        <form onSubmit={handleEvent}>
          <div className="form-group mb-3">
            <label className="mb-1">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
