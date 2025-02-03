import express, { Router, Request } from "express";

import { LocationController } from "../controllers/LocationController";
import { MockLocationService } from "../services/mock/mockLocationService";
import { LocationService } from "../services/locationService";

interface GetCityRequest extends Request {
  query: {
    provinceId?: string;
  };
}

const router: Router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const locationService = isTestEnvironment
  ? new MockLocationService()
  : new LocationService();

const locationController = new LocationController(locationService);

router.get("/provinces", locationController.getAllProvinces);
router.get("/cities", (req: GetCityRequest, res, next) => {
  locationController.getCitiesByProvince(req, res, next);
});

export { router as locationRoutes };
