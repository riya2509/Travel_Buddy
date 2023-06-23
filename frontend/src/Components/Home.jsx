import React, { useState } from "react";
import Navbar from "./Layouts/Navbar";
// import Filter from "./Filter";
// import LocSearch from "./LocSearch";
import FetchData from "./FetchData";
import AlertDialog from "./AlertDialog";

function Home() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar />
      <AlertDialog data={data} setData={setData} />
      {/* <LocSearch /> */}
      <FetchData data={data} setData={setData} />
    </div>
  );
}

export default Home;
