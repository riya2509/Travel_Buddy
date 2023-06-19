import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Layouts/Card";
import { Grid } from "@mui/material";

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

  // console.log(data);

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
      <div></div>
      {data.map(
        ({
          id,
          description,
          fromPlace,
          toPlace,
          startDate,
          endDate,
          trainInfo,
        }) => (
          <Grid key={id} container direction="column">
            <Grid item sm={12} xs={12} md={2}></Grid>
            <Grid item sm={12} xs={12} md={8}>
              <Card
                description={description}
                fromPlace={fromPlace}
                toPlace={toPlace}
                startDate={startDate}
                endDate={endDate}
                trainInfo={trainInfo}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={2}></Grid>
          </Grid>
        )
      )}
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
