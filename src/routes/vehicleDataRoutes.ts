import express, { Router, Request } from "express";
import { VehicleDataController } from "../controllers/VehicleDataController";
import { MockVehicleDataService } from "../services/mockVehicleDataService";

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

const vehicleDataService = new MockVehicleDataService();
const vehicleDataController = new VehicleDataController(vehicleDataService);

router.get("/categories", vehicleDataController.getAllCategories);
router.get("/categories/:categoryId", (req: GetCategoryRequest, res, next) => {
  vehicleDataController.getCategoryById(req, res, next);
});

router.get("/makes", (req: GetMakeRequest, res, next) => {
  vehicleDataController.getMakesByCategory(req, res, next);
});
router.get("/makes/:makeId", (req: GetMakeRequest, res, next) => {
  vehicleDataController.getMakeById(req, res, next);
});

router.get("/models", (req: GetModelRequest, res, next) => {
  vehicleDataController.getModelsByMake(req, res, next);
});
router.get("/models/:modelId", (req: GetModelRequest, res, next) => {
  vehicleDataController.getModelById(req, res, next);
});

router.get("/versions", (req: GetVersionRequest, res, next) => {
  vehicleDataController.getVersionsByModel(req, res, next);
});
router.get("/versions/:versionId", (req: GetVersionRequest, res, next) => {
  vehicleDataController.getVersionById(req, res, next);
});

export { router as vehicleDataRoutes };
