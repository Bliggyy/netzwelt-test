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
  const [metroManila, setMetroManila] = useState<any[]>([]);
  const [calabarzon, setCalabarzon] = useState<any[]>([]);
  const [centralLuzon, setCentralLuzon] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated === true) {
      navigate("/home/index");
    } else if (user.isAuthenticated === false) {
      navigate("/account/login");
    }
  }, [territories]);

  const getTerritories = () => {
    try {
      fetch("http://localhost:8000/home/index")
        .then((response) => response.json())
        .then((data) => {
          setTerritories(data.data);
          setMainAreas(territories);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setMainAreas = (areas: any) => {
    const value1 = areas.filter((territory: any) => {
      return territory.name == "Metro Manila";
    });
    setMetroManila({ ...value1[0] });
    const value2 = areas.filter((territory: any) => {
      return territory.name == "CALABARZON";
    });
    setCalabarzon({ ...value2[0] });
    const value3 = areas.filter((territory: any) => {
      return territory.name == "Central Luzon";
    });
    setCentralLuzon({ ...value3[0] });
  };

  return (
    <>
      <h1>Territories</h1>
      <h3 onClick={getTerritories}>
        Here are the list of territories (you may need to click me a couple of
        times)
      </h3>
      <TreeList item={metroManila} />
      <TreeList item={calabarzon} />
      <TreeList item={centralLuzon} />
    </>
  );
}

export default Home;
