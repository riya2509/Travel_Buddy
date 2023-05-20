import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("riya@gmail.com");
  const [password, setPassword] = useState("abcd");

  const handleLogin = () => {
    console.log({ email, password });
    axios
      .post("/auth/login", { email, password })
      .then((response) => {
        console.log(response.data.status);
        const { status, message, token } = response.data;
        if (status === 1) {
          toast.success(message);
          window.localStorage.setItem("token", token);
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
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
