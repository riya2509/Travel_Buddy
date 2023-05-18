import express from "express";
import authController from "../controller/authController.js";

const authRoutes = express.Router();
authRoutes.post("/register", authController.register);
authRoutes.get("/login", authController.login);

export default authRoutes;
