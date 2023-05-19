import express from "express";
import appController from "../controller/appController.js";
const appRoutes = express.Router();

appRoutes.get("/city", appController.getCity);

export default appRoutes;
