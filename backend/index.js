import express from "express";
import dotenv from "dotenv";
import authRoutes from "./app/routes/authRoutes.js";
import appRoutes from "./app/routes/appRoutes.js";
import mysql from "./databases/database.js";
dotenv.config({ path: "../.env" });

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  const { url, method, body } = req;
  if (url.match("/api") || url.match("/auth")) {
    console.log(
      `[METHOD]: ${method} [URL]: ${url} at ${new Date().toLocaleString()}`
    );
    method === "POST" && console.log(body);
  }
  next();
  //   res.send({ message: "This site is under maintainance." });
});
app.use("/auth", authRoutes);
app.use("/api", appRoutes);

app.listen(PORT || 5000, () => console.log(`App started on Port ${PORT}`));
