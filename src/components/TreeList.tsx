import { useState } from "react";

const TreeList = ({ item }: any) => {
  // console.log(item);
  const [data, setData] = useState([]);
  const [children, setChildren] = useState([]);
  const onClick = () => setData(load(item.id));

  const loadTerritories = (parent: any) => {
    try {
      fetch("http://localhost:8000/home/index")
        .then((response) => response.json())
        .then((data) => {
          const value = data.data.filter((el: any) => el.parent === parent);
          setChildren(value);
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

  const load = (parent: any) => {
    loadTerritories(parent);
    console.log(children);
    return children;
  };

  return (
    <div className="category">
      <div className={`category-name ${data ? "open" : ""}`} onClick={onClick}>
        {item.name}
      </div>

      {data && (
        <ul>
          {data.map((child, i) => (
            <li key={i}>
              <Node item={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeList;
