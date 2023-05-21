import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("riya@gmail.com");
  const [password, setPassword] = useState("abcd");

  const handleLogin = () => {
    axios
      .post("/auth/login", { email, password })
      .then((response) => {
        const { status, message, token } = response.data;
        if (status === 1) {
          toast.success(` ${message} 😎`);
          window.localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(message);
          removeToken();
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Some issue with server`);
        removeToken();
      });
  };

  const removeToken = () => {
    window.localStorage.clear();
  };
  return (
    <div>
      <div className="outerbox">
        <TextField
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="text" onClick={() => navigate("/register")}>
          Do not have an account? Register now.
        </Button>
      </div>
    </div>
  );
}

export default Login;
