import React, { useEffect, useState } from "react";
import "./AlertDialog.css";
import { Button, Grid, TextField } from "@mui/material";
import propTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialog({ data, setData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [payload, setPayload] = useState({
    cityName: "",
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    trainInfo: "",
  });
  const handleClose = () => {
    setOpen(false);
    setPayload({
      cityName: "",
      destination: "",
      description: "",
      startDate: "",
      endDate: "",
      trainInfo: "",
    });
  };

  const [cityData, setCityData] = useState([]);

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
      ...payload,
      fromPlaceId: payload.cityName.value,
      toPlaceId: payload.destination.value,
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
          const val = [...data];
          val.unshift(response.data.data);
          setData(val);
          handleClose();
        } else {
          toast.error(`${message} 😅`);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Some error while posting travel plan`);
      });
  };

  const handleChange = (e, fieldName = "") => {
    const value = { ...payload };
    if (fieldName === "cityName" || fieldName === "destination") {
      value[fieldName] = e;
    } else {
      value[e.target.name] = e.target.value;
    }
    setPayload(value);
  };

  return (
    <div className="outerBox">
      <div className="mainContent"></div>

      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Something on your mind?
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Want to post something?"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <div className="currLoc">
                  <span className="labels">From:</span>
                  <Select
                    className="cityDropdown"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Select City"
                    options={cityArray}
                    value={payload.cityName}
                    // name="cityName"
                    //   optional chaining
                    // onChange={(e) => setCityName(e?.value)}
                    onChange={(e) => handleChange(e, "cityName")}
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
                    value={payload.destination}
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
                    value={payload.startDate}
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
                    value={payload.endDate}
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
                  value={payload.trainInfo}
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
                  value={payload.description}
                  name="description"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  // onChange={handleChange}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlePost}>Post</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
AlertDialog.propTypes = {
  data: propTypes.array,
  setData: propTypes.func,
};

export default AlertDialog;
