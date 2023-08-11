import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return <></>;
}

export default Logout;
