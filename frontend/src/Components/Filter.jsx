import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Filter() {
  const [city_name, setCity_name] = useState("");
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(-1);

  const searchCity = () => {
    axios
      .get("/api/city")
      .then((response) => {
        setCityData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(cityData);
  console.log(selectedCity);
  return (
    <div>
      <div className="inputCity">
        <TextField
          placeholder="City name"
          value={city_name}
          onChange={(e) => setCity_name(e.target.value)}
        />
        <Button variant="contained" onClick={searchCity}>
          Search City
        </Button>
        <InputLabel id="citySelect">City</InputLabel>
        <Select
          labelId="citySelect"
          value={selectedCity}
          label="City"
          style={{ width: "200px" }}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <MenuItem value={-1}> Select a City</MenuItem>
          {cityData.map((val, index) => {
            return (
              <MenuItem value={val.id} key={index}>
                {val.city_name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}

export default Filter;

// input box name jam search button list of cities
//json.stringify
//city route
//button click list
//dropdown select city name
