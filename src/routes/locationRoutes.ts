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

/**
 * @swagger
 * /api/locations/provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of provinces
 */
router.get("/provinces", locationController.getAllProvinces);

/**
 * @swagger
 * /api/locations/cities:
 *   get:
 *     summary: Get cities by province
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: provinceId
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of the province to filter cities
 *     responses:
 *       200:
 *         description: List of cities
 *       400:
 *         description: Invalid province ID
 */
router.get("/cities", (req: GetCityRequest, res, next) => {
  locationController.getCitiesByProvince(req, res, next);
});

export { router as locationRoutes };
