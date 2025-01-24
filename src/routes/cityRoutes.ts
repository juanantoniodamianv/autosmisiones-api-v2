import express from "express";
import { cityController } from "../controllers/CityController";

const router = express.Router();

router.get("/cities", cityController.getAllCities);
router.get("/cities/:id", cityController.getCityById);
router.post("/cities", cityController.createCity);
router.put("/cities/:id", cityController.updateCity);
router.delete("/cities/:id", cityController.deleteCity);

export { router as cityRoutes };
