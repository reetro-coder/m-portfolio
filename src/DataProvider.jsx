import { useState, useEffect } from "react";
import DataContext from "./context/DataContext";
import PropTypes from "prop-types";

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error fetching data.json", err));
  }, []);

  // todo: add loading screen
  return (
    <DataContext.Provider value={data}>{data && children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
