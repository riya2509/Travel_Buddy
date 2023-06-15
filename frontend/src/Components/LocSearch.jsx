import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./LocSearch.css";
import Select from "react-select";
import { Button, Grid, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
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
  const [isTravelling, setIsTravelling] = useState(false);
  //   const [cityName, setCityName] = useState("");
  //   const [destination, setDestination] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");
  //   const [trainInfo, setTrainInfo] = useState("");
  const [data, setData] = useState({
    cityName: "",
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    trainInfo: "",
  });

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
  //   console.log({ from: cityName, to: destination });
  //   console.log(destination);
  //   console.log(cityData);
  const handlePost = () => {
    const payLoad = {
      ...data,
      fromPlace: data.cityName.value,
      toPlace: data.destination.value,
    };
    delete payLoad.cityName;
    delete payLoad.destination;
    // console.log(payLoad);
    axios
      .post("/api/post", payLoad)
      .then((response) => {
        const { status, message } = response.data;
        if (status === 1) {
          toast.success(`${message} 😄`);
        } else {
          toast.error(`${message} 😅`);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Some error while posting travel plan`);
      });
  };

  const handleSwitch = (e) => {
    // console.log(e.target.checked);
    setIsTravelling(e.target.checked);
  };

  const handleChange = (e, fieldName = "") => {
    const value = { ...data };
    if (fieldName === "cityName" || fieldName === "destination") {
      value[fieldName] = e;
    } else {
      value[e.target.name] = e.target.value;
    }
    setData(value);
  };
  return (
    <div className="outerBox">
      <div className="container">
        <b>Are you travelling?</b>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>No</Typography>
          <AntSwitch
            onChange={handleSwitch}
            checked={isTravelling}
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
              value={data.cityName}
              // name="cityName"
              //   optional chaining
              // onChange={(e) => setCityName(e?.value)}
              onChange={(e) => handleChange(e, "cityName")}
              isDisabled={!isTravelling}
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
              isDisabled={!isTravelling}
              value={data.destination}
              // name="destination"
              // onChange={(e) => handleChange(e?.value)}
              onChange={(e) => handleChange(e, "destination")}
            />
          </div>
        </Grid>

        <Grid item sm={12} md={6}>
          <div className="startDate">
            <span className="labels">Start Date:</span>
            <input
              type="date"
              className="date"
              value={data.startDate}
              name="startDate"
              onChange={(e) => handleChange(e)}
              //   onChange={handleChange}
            />
          </div>
        </Grid>

        <Grid item sm={12} md={6}>
          <div className="endDate">
            <span className="labels">End Date:</span>
            <input
              type="date"
              className="date"
              value={data.endDate}
              name="endDate"
              onChange={(e) => handleChange(e)}
              //   onChange={handleChange}
            />
          </div>
        </Grid>

        <Grid item sm={12} md={6}>
          <TextField
            name="trainInfo"
            className="trainInfo"
            placeholder="Train Number"
            value={data.trainInfo}
            onChange={(e) => handleChange(e)}
            // onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item md={10}>
          <TextField
            fullWidth={true}
            variant="filled"
            multiline
            rows={2}
            placeholder="What's on your mind?"
            disabled={!isTravelling}
            value={data.description}
            name="description"
            onChange={(e) => {
              handleChange(e);
            }}
            // onChange={handleChange}
          ></TextField>
        </Grid>

        <Grid item md={2}>
          <Button
            style={{ marginTop: "42px" }}
            fullWidth={true}
            disabled={!isTravelling}
            variant="contained"
            onClick={handlePost}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default LocSearch;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
