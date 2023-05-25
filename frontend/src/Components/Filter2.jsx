import React, { useState } from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

function Filter2() {
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState([]);
  const [dropCity, setDropCity] = useState(-1);

  const searchCity = () => {
    axios
      .post("/api/city", { name: cityName })
      .then((response) => {
        setCityData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(dropCity);
  return (
    <>
      <div className="inputBox">
        <TextField
          variant="outlined"
          placeholder="City Name"
          onChange={(e) => setCityName(e.target.value)}
        ></TextField>
        <Button
          onClick={searchCity}
          style={{ height: "50px", width: "150px" }}
          variant="contained"
        >
          Search City
        </Button>
      </div>
      <InputLabel id="dropBox">City</InputLabel>
      <Select
        id="dropBox"
        style={{ height: "50px", width: "150px" }}
        value={dropCity}
        onChange={(e) => setDropCity(e.target.value)}
      >
        <MenuItem value={-1}>Select City</MenuItem>
        {cityData.map((val, index) => {
          return (
            <MenuItem value={val.id} key={index}>
              {val.cityName}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default Filter2;
