import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TreeList from "../components/TreeList";

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

  const user = getUser;
  const [territories, setTerritories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated === true) {
      navigate("/home/index");
    } else if (user.isAuthenticated === false) {
      navigate("/account/login");
    }
    getTerritories();
  }, []);

  const getTerritories = async () => {
    try {
      await fetch("http://localhost:8000/home/index")
        .then((response) => response.json())
        .then((data) => {
          setTerritories(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setMainAreas = () => {
    const filtered = territories.filter((territory: any) => {
      return territory.parent === null;
    });

    return filtered.map((element: any, index) => {
      return <TreeList item={element} key={index} />;
    });
  };

  return (
    <>
      <h1>Territories</h1>
      <h3 onClick={getTerritories}>Here are the list of territories</h3>
      {territories.length ? (
        <div>{setMainAreas()}</div>
      ) : (
        <div>
          <h3>Loading territories...</h3>
        </div>
      )}
    </>
  );
}

export default Home;
