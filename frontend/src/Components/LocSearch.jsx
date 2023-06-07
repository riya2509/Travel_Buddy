import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./LocSearch.css";
import Select from "react-select";
import { Button, Grid } from "@mui/material";
// import { Autocomplete, TextField } from "@mui/material";

function LocSearch() {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [destination, setDestination] = useState("");

  const searchCity = () => {
    axios
      .get("/api/city")
      .then((response) => {
        // console.log(response.data.data);
        setCityData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    searchCity();
  }, []);

  const cityArray = cityData.map((val) => {
    return { label: val.city_name, value: val.id };
  });
  console.log({ from: cityName, to: destination });
  //   console.log(destination);

  //   console.log(cityData);

  return (
    <div className="outerBox">
      <div className="container">
        <b>Are you travelling?</b>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>No</Typography>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
          />
          <Typography>Yes</Typography>
        </Stack>
      </div>
      <Grid container spacing={5}>
        <Grid item sm={12} md={6}>
          <div className="currLoc">
            <span className="labels">From:</span>
            <Select
              className="cityDropdown"
              isClearable={true}
              isSearchable={true}
              placeholder="Select City"
              options={cityArray}
              //   optional chianing
              onChange={(e) => setCityName(e?.value)}
              isDisabled={true}
            />
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          <div className="destination">
            <span className="labels">TO:</span>
            <Select
              className="cityDropdown"
              isClearable={true}
              isSearchable={true}
              placeholder="Select City"
              options={cityArray}
              onChange={(e) => setDestination(e?.value)}
            />
          </div>
        </Grid>
        <Button variant="contained">Post</Button>
      </Grid>
    </div>
  );
}

export default LocSearch;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
