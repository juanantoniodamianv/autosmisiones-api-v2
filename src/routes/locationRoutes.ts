import express, { Router, Request } from "express";
import { LocationController } from "../controllers/LocationController";
import { MockLocationService } from "../services/mock/mockLocationService";

interface GetCityRequest extends Request {
  query: {
    provinceId?: string;
  };
}

const router: Router = express.Router();

const locationService = new MockLocationService();
const locationController = new LocationController(locationService);

router.get("/provinces", locationController.getAllProvinces);
router.get("/cities", (req: GetCityRequest, res, next) => {
  locationController.getCitiesByProvince(req, res, next);
});

export default router;
