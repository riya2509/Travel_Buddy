import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./Register.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [college, setCollege] = useState("");

  const handleRegister = () => {
    axios
      .post("/auth/register", {
        name,
        email,
        password,
        phoneNum,
        gender,
        year,
        college,
      })
      .then((response) => {
        console.log(response);
        const { status, message } = response.data;
        if (status === 1) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Some issue registering you in`);
      });
  };

  return (
    <div className="Outerdiv">
      <TextField
        className="inner"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className="inner"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="inner"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className="inner"
        type="tel"
        placeholder="Phone Number"
        value={phoneNum}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        className="inner"
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <TextField
        className="inner"
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <TextField
        className="inner"
        type="text"
        placeholder="College Name"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <Button variant="text" onClick={() => navigate("/login")}>
        Already Registered? Login
      </Button>
    </div>
  );
}

export default Register;
