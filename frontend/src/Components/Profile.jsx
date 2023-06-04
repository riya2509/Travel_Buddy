import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function Profile() {
  //   const [data, setData] = useState([]);
  const [value, setValue] = useState({
    name: "",
    email: "",
    phoneNum: "",
    gender: "",
    year: "",
    college: "",
    id: null,
  });

  useEffect(() => {
    handleProfile();
  }, []);

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
        toast.error(`Some issue while fetching the data`);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Grid has 12 boxes */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Name"
            name="name"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="email"
            label="Email"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.email}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Phone Number"
            name="phoneNum"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.phoneNum}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Gender"
            name="gender"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.gender}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Year Studying In"
            name="year"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.year}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="College"
            name="college"
            onChange={handleChange}
            className="inputBox"
            fullWidth={true}
            value={value.college}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Grid>
      </Grid>
      {/* <div className="data">{JSON.stringify(data[0])}</div> */}
    </div>
  );
}

export default Profile;

// set the data from the coming objecct
