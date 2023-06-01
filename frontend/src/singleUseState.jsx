import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

function singleUseState() {
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [gender, setGender] = useState("");
  const [data, setData] = useState({
    title: "",
    email: "",
    phone: "",
    gender: "",
  });
  //   console.log(data);
  const handleSubmit = () => {
    // console.log({ name, email, phone, gender });
    console.log(data);
  };

  const handleChange = (e) => {
    const value = { ...data };
    value[e.target.name] = e.target.value; //title, email, phone, gender=setting the value e.g email:value
    setData(value);
  };

  return (
    <>
      <div className="outerDiv">
        <TextField
          name="title"
          className="inputBox"
          type="text"
          placeholder="Name"
          value={data.title}
          onChange={handleChange}
        />
        <TextField
          name="email"
          className="inputBox"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          className="inputBox"
          type="tel"
          placeholder="Phone Number"
          value={data.phone}
          onChange={handleChange}
        />
        <TextField
          name="gender"
          className="inputBox"
          type="text"
          placeholder="Gender"
          value={data.gender}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default singleUseState;
