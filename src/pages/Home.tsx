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

  // const sortTerritories = (data: any[]) => {
  //   const table: any = [];
  //   data.forEach((el) => {
  //     if (!table[el.parent]) {
  //       table[el.parent] = [];
  //     }
  //     table[el.parent].push(el);
  //   });
  //   const result: any = [];
  //   const constructResult = (key: any) => {
  //     if (table[key]) {
  //       table[key].forEach((el: any) => {
  //         result.push(el);
  //         constructResult(el.id);
  //       });
  //     }
  //   };

  //   constructResult(null);
  //   return result;
  // };

  const setMainAreas = (areas: any) => {
    // console.log(areas);
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

  // const getMetroManila = () => {
  //   console.log(
  //     territories.filter((territory) => {
  //       return territory.name === "Metro Manila";
  //     })
  //   );
  //   console.log(metroManila);
  //   getTerritories();
  // };

  return (
    <>
      <h1>Territories</h1>
      <h3 onClick={getTerritories}>Here are the list of territories</h3>
      <TreeList item={metroManila} />
      <TreeList item={calabarzon} />
      <TreeList item={centralLuzon} />
    </>
  );
}

export default Home;
