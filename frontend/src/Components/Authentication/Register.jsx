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
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    axios
      .post("/auth/register", { name, email, password, phone })
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
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="number"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
