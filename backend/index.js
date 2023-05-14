import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;
const app = express();

app.listen(PORT || 5002, () => console.log(`App started on Port ${PORT}`));
