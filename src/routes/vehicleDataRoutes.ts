import express, { Router, Request } from "express";
import { VehicleDataController } from "../controllers/VehicleDataController";
import { MockVehicleDataService } from "../services/mock/mockVehicleDataService";
import { VehicleDataService } from "../services/vehicleDataService";

interface GetCategoryRequest extends Request {
  params: {
    categoryId: string;
  };
}

interface GetMakeRequest extends Request {
  params: {
    makeId: string;
  };
  query: {
    categoryId?: string;
  };
}

interface GetModelRequest extends Request {
  params: {
    modelId: string;
  };
  query: {
    makeId?: string;
  };
}

interface GetVersionRequest extends Request {
  params: {
    versionId: string;
  };
  query: {
    modelId?: string;
  };
}

const router: Router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const vehicleDataService = isTestEnvironment
  ? new MockVehicleDataService()
  : new VehicleDataService();
const vehicleDataController = new VehicleDataController(vehicleDataService);

/**
 * @swagger
 * /api/vehicles/categories:
 *   get:
 *     summary: Get all vehicle categories
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: A list of all vehicle categories
 */
router.get("/categories", vehicleDataController.getAllCategories);

/**
 * @swagger
 * /api/vehicles/categories/{categoryId}:
 *   get:
 *     summary: Get vehicle category by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified vehicle category
 */
router.get("/categories/:categoryId", (req: GetCategoryRequest, res, next) => {
  vehicleDataController.getCategoryById(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/makes:
 *   get:
 *     summary: Get vehicle makes by category
 *     tags: [Vehicles]
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of vehicle makes for the specified category
 */
router.get("/makes", (req: GetMakeRequest, res, next) => {
  vehicleDataController.getMakesByCategory(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/makes/{makeId}:
 *   get:
 *     summary: Get vehicle make by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: makeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified vehicle make
 */
router.get("/makes/:makeId", (req: GetMakeRequest, res, next) => {
  vehicleDataController.getMakeById(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/models:
 *   get:
 *     summary: Get vehicle models by make
 *     tags: [Vehicles]
 *     parameters:
 *       - name: makeId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of vehicle models for the specified make
 */
router.get("/models", (req: GetModelRequest, res, next) => {
  vehicleDataController.getModelsByMake(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/models/{modelId}:
 *   get:
 *     summary: Get vehicle model by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: modelId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified vehicle model
 */
router.get("/models/:modelId", (req: GetModelRequest, res, next) => {
  vehicleDataController.getModelById(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/versions:
 *   get:
 *     summary: Get vehicle versions by model
 *     tags: [Vehicles]
 *     parameters:
 *       - name: modelId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of vehicle versions for the specified model
 */
router.get("/versions", (req: GetVersionRequest, res, next) => {
  vehicleDataController.getVersionsByModel(req, res, next);
});

/**
 * @swagger
 * /api/vehicles/versions/{versionId}:
 *   get:
 *     summary: Get vehicle version by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: versionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified vehicle version
 */
router.get("/versions/:versionId", (req: GetVersionRequest, res, next) => {
  vehicleDataController.getVersionById(req, res, next);
});

export { router as vehicleDataRoutes };
