import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function Register() {
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
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
