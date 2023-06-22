import React from "react";
import Navbar from "./Layouts/Navbar";
// import Filter from "./Filter";
// import LocSearch from "./LocSearch";
import FetchData from "./FetchData";
import AlertDialog from "./AlertDialog";

function Home() {
  return (
    <div>
      <Navbar />
      <AlertDialog />
      {/* <LocSearch /> */}
      <FetchData />
    </div>
  );
}

export default Home;
