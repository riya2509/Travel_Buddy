import React from "react";
import Navbar from "./Layouts/Navbar";
// import Filter from "./Filter";
import LocSearch from "./LocSearch";
import FetchData from "./FetchData";

function Home() {
  return (
    <div>
      <Navbar />
      <LocSearch />
      <FetchData />
    </div>
  );
}

export default Home;
