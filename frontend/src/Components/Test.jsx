import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TEST_API } from "../api";

function Test() {
  const { data, isLoading } = useQuery(["test"], TEST_API);
  const handleClick = async () => {};
  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <pre>{JSON.stringify(data, null, 5)}</pre>
      )}
    </div>
  );
}

export default Test;
