import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function FetchData() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  //Eagerly loading
  const prev = () => {
    setPage(page - 1);
  };

  //lazily setting the state
  const next = () => {
    setPage((prev) => prev + 1);
  };

  console.log(data);

  const fetchPost = () => {
    axios
      .get("/api/post", { params: { page: page, row: 5 } })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPost();
  }, [page]);

  return (
    <>
      <div>FetchData</div>
      <Button
        variant="contained"
        style={{ margin: "20px" }}
        onClick={prev}
        disabled={page < 2}
      >
        Prev
      </Button>
      <Button variant="contained" onClick={next} disabled={data.length === 0}>
        Next
      </Button>
    </>
  );
}

export default FetchData;
