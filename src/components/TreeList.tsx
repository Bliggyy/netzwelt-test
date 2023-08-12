import { useEffect, useState } from "react";

const TreeList = ({ item }: any) => {
  const [data, setData] = useState([]);
  const [children, setChildren] = useState([]);
  const onClick = data.length <= 0 ? () => setData(load()) : () => setData([]);

  useEffect(() => {
    loadTerritories(item.id);
  }, [data]);

  const loadTerritories = async (parent: any) => {
    try {
      await fetch("http://localhost:8000/home/index")
        .then((response) => response.json())
        .then((data) => {
          setChildren(data.data.filter((el: any) => el.parent === parent));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Segment = ({ item: { name } }: any) => (
    <div className="segment">{name}</div>
  );

  const Node = ({ item }: any) => {
    const Cmp =
      item.id.toString().length < 5 && item.parent !== "3" ? TreeList : Segment;
    return <Cmp item={item} />;
  };

  const load = () => {
    return children;
  };

  return (
    <div className="category">
      <div className={`category-name ${data ? "open" : ""} `} onClick={onClick}>
        {item.name}
      </div>

      {data.length ? (
        <ul>
          {data.map((child, i) => (
            <li key={i}>
              <Node item={child} />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TreeList;
