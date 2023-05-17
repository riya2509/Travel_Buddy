import express from "express";
import appController from "../controller/appController.js";
const appRoutes = express.Router();

appRoutes.route("/hello").get(appController.welcome);
appRoutes.post("/create", appController.createData);

export default appRoutes;
