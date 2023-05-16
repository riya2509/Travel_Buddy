import express from "express";
import dotenv from "dotenv";
import authRoutes from "./app/routes/authRoutes.js";
import appRoutes from "./app/routes/appRoutes.js";

dotenv.config({ path: "../.env" });

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", appRoutes);

app.listen(PORT || 5000, () => console.log(`App started on Port ${PORT}`));
