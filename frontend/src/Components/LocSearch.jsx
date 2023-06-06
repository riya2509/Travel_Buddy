import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./LocSearch.css";
import { Autocomplete, TextField } from "@mui/material";

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
  const options = cityData.map((val) => {
    return val.city_name;
  });

  const searchCity = () => {
    axios
      .get("/api/city")
      .then((response) => {
        console.log(response.data.data);
        setCityData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //   console.log(
  //     cityData.map((val) => {
  //       return val.city_name;
  //     })
  //   );

  useEffect(() => {
    searchCity();
  }, []);

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="outerBox">
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select City" />
          )}
        />
      </div>

      <div className="container">
        <b>Are you travelling?</b>
      </div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>No</Typography>
        <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
        <Typography>Yes</Typography>
      </Stack>
      <br />
      <div className="currLoc">
        From
        <select name="city" id="city">
          <option value="">Select a City</option>
          {cityData.map((val, index) => {
            return (
              <option value="cityData" key={index}>
                {val.city_name}
              </option>
            );
          })}
        </select>
      </div>

      <br />
      <div className="destination">
        To
        <select name="city" id="city">
          <option value="">Select a City</option>
          {cityData.map((val, index) => {
            return (
              <option value="cityData" key={index}>
                {val.city_name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default LocSearch;
