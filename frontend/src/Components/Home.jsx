import React, { useState } from "react";
import Navbar from "./Layouts/Navbar";
// import Filter from "./Filter";
import LocSearch from "./LocSearch";
import FetchData from "./FetchData";
import CreatePost from "./CreatePost";

function Home() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar />
      <CreatePost data={data} setData={setData} />
      <LocSearch />
      <FetchData data={data} setData={setData} />
    </div>
  );
}

export default Home;
