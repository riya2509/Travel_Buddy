import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401 || error.response.status === 403) {
      window.localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
