import express from "express";
import appController from "../controller/appController.js";
import { isAuthenticated } from "../middlewares/authentication.js";
const appRoutes = express.Router();

appRoutes.use(isAuthenticated);
appRoutes.get("/city", appController.getCity);
appRoutes.get("/me", appController.getProfile);

export default appRoutes;
