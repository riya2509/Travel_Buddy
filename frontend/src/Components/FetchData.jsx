import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Layouts/Card";
import { Grid } from "@mui/material";
import propTypes from "prop-types";

function FetchData({ data, setData }) {
  const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);

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
      .get("/api/post", { params: { page: page, row: 10 } })
      .then((response) => {
        setData(response.data.data[0]);
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
          name,
          college,
          description,
          fromPlace,
          toPlace,
          startDate,
          endDate,
          trainInfo,
        }) => (
          <Grid key={id} container>
            <Grid item sm={3} xs={12} md={3}></Grid>
            <Grid item sm={6} xs={12} md={6}>
              <Card
                name={name}
                college={college}
                description={description}
                fromPlace={fromPlace}
                toPlace={toPlace}
                startDate={startDate}
                endDate={endDate}
                trainInfo={trainInfo}
              />
            </Grid>
            <Grid item sm={3} xs={12} md={3}></Grid>
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

FetchData.propTypes = {
  data: propTypes.array,
  setData: propTypes.func,
};

export default FetchData;
