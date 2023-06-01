import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Profile() {
  //   const [data, setData] = useState([]);
  const [value, setValue] = useState({
    name: "",
    email: "",
    phoneNum: "",
    gender: "",
    year: "",
    currLocation: "",
    destination: "",
    college: "",
    id: null,
  });

  const handleSubmit = () => {
    console.log(value);
  };

  const handleChange = (e) => {
    const flag = { ...value };
    flag[e.target.name] = e.target.value;
    setValue(flag);
  };

  const handleProfile = () => {
    axios
      .get("/api/me")
      .then((response) => {
        console.log(response.data.data[0]);
        setValue(response.data.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {/* Grid has 12 boxes */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="name"
            onChange={handleChange}
            className="inputBox"
            placeholder="Name"
            fullWidth={true}
            value={value.name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="email"
            onChange={handleChange}
            className="inputBox"
            placeholder="Email"
            fullWidth={true}
            value={value.email}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="phoneNum"
            onChange={handleChange}
            className="inputBox"
            placeholder="Phone Number"
            fullWidth={true}
            value={value.phoneNum}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="gender"
            onChange={handleChange}
            className="inputBox"
            placeholder="Gender"
            fullWidth={true}
            value={value.gender}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="year"
            onChange={handleChange}
            className="inputBox"
            placeholder="Year Studying In"
            fullWidth={true}
            value={value.year}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="currLocation"
            onChange={handleChange}
            className="inputBox"
            placeholder="Current Location"
            fullWidth={true}
            value={value.currLocation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="destination"
            onChange={handleChange}
            className="inputBox"
            placeholder="Destination"
            fullWidth={true}
            value={value.destination}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="college"
            onChange={handleChange}
            className="inputBox"
            placeholder="College"
            fullWidth={true}
            value={value.college}
          />
        </Grid>
      </Grid>
      <div>
        Profile data :<Button onClick={handleProfile}>Data</Button>
        {/* <div className="data">{JSON.stringify(data[0])}</div> */}
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default Profile;

// set the data from the coming objecct
