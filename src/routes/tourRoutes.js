import express from "express";
import tourController from "../controllers/tourcontroller";
import validator from "../middlewares/validator";
import verifyToken from "../middlewares/verifytoken";
import verifyAccess from "../middlewares/verfiyaccess";



const tourRouter = express.Router();
tourRouter.post("/create",
verifyToken,
verifyAccess("admin"),
validator.newToursRules(),
validator.validateInput,
tourController.createTours);
tourRouter.get("/alltour", tourController.getAllTours);
tourRouter.get("/:id",tourController.getOneTour)




export default tourRouter;
