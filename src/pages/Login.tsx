import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorBox, setErrorBox] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated === true) {
      navigate("/home/index");
    }
  }, []);

  const login = (username: String, password: String) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      fetch("http://localhost:8000/account/login", options)
        .then((response) => response.json())
        .then((user) => {
          if (user.hasOwnProperty("message")) {
            setErrorBox("block");
            setErrorMessage(user.message);
          } else {
            const newUser = {
              username: user.username,
              displayName: user.displayName,
              roles: user.roles,
              isAuthenticated: true,
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            navigate("/home/index");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEvent = (e: any) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <div className="container border p-4">
        <h1 className="mb-4">Welcome to Login Page</h1>
        <div className={`alert alert-danger d-${errorBox}`} role="alert">
          {errorMessage}
        </div>
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
