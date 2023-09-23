import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Layouts/Card";
import { Button, Grid } from "@mui/material";
import propTypes from "prop-types";
import styled from "styled-components";

const StyleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px 0px 20px 0px;
`;

const ButtonComponent = styled(Button)`
  margin-right: 15px;
`;
const Divider = styled.div`
  background-color: #cecece;
  padding: 10px 15px;
  margin: 13px;
  border-radius: 12px;
  transition: transform 0.2s;
  &.active {
    transform: scale(1.2);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
      rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }
`;

function FetchData({ data, setData }) {
  const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);

  const [index, setIndex] = useState(0);
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
    let query = ``;
    switch (index) {
      case 2:
        query = "myplan";
        break;
      case 1:
        query = "today";
        break;

      default:
        query = "all";
        break;
    }
    axios
      .get("/api/post", { params: { page: page, row: 10, type: query } })
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPost();
  }, [page, index]);

  useEffect(() => {
    setPage(1);
  }, [index]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "center",
        }}
      >
        <Divider
          className={index === 0 && "active"}
          onClick={() => setIndex(0)}
        >
          All
        </Divider>
        <Divider
          className={index === 1 && "active"}
          onClick={() => setIndex(1)}
        >
          Today Plan
        </Divider>
        <Divider
          className={index === 2 && "active"}
          onClick={() => setIndex(2)}
        >
          My Plans
        </Divider>
      </div>
      {data.map(
        (
          {
            id,
            name,
            college,
            description,
            fromPlace,
            toPlace,
            startDate,
            endDate,
            trainInfo,
            likedByCurrentUser,
            likes,
          },
          index
        ) => (
          <Grid key={id} container>
            <Grid item sm={3} xs={12} md={3}></Grid>
            <Grid item sm={6} xs={12} md={6}>
              <Card
                index={index}
                setData={setData}
                name={name}
                college={college}
                description={description}
                fromPlace={fromPlace}
                toPlace={toPlace}
                startDate={startDate}
                endDate={endDate}
                trainInfo={trainInfo}
                likedByCurrentUser={likedByCurrentUser}
                likes={likes}
                id={id}
              />
            </Grid>
            <Grid item sm={3} xs={12} md={3}></Grid>
          </Grid>
        )
      )}
      <StyleButton>
        <ButtonComponent
          className="prev"
          variant="contained"
          onClick={prev}
          disabled={page < 2}
        >
          Prev
        </ButtonComponent>

        <Button variant="contained" onClick={next} disabled={data.length === 0}>
          Next
        </Button>
      </StyleButton>
    </>
  );
}

FetchData.propTypes = {
  data: propTypes.array,
  setData: propTypes.func,
};

export default FetchData;
