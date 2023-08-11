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

  const getTerritories = () => {
    try {
      fetch("http://localhost:8000/home/index")
        .then((response) => response.json())
        .then((data) => {
          setTerritories(sortTerritories(data.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortTerritories = (data: any[]) => {
    console.log(data);
    const table: any = [];
    data.forEach((el) => {
      if (!table[el.parent]) {
        table[el.parent] = [];
      }
      table[el.parent].push(el);
    });
    const result: any = [];
    const constructResult = (key: any) => {
      if (table[key]) {
        table[key].forEach((el: any) => {
          result.push(el);
          constructResult(el.id);
        });
      }
    };

    constructResult(null);
    console.log(result);
    return result;
  };

  const renderTerritories = () => {
    return territories.map((territory: any, index) => {
      return (
        <div key={index}>
          <li>
            ID: {territory.id} Name: {territory.name} Parent: {territory.parent}
          </li>
        </div>
      );
    });
  };

  return (
    <>
      <h1>Territories</h1>
      <h3>Here are the list of territories</h3>
      {renderTerritories()}
    </>
  );
}

export default Home;
