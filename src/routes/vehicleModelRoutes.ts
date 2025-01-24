import express from "express";
import { vehicleModelController } from "../controllers/VehicleModelController";

const router = express.Router();

// Obtener todas las marcas de vehículos
router.get("/vehicle-models", vehicleModelController.getAllVehicleModels);

// Obtener una marca de vehículo por ID
router.get("/vehicle-models/:id", vehicleModelController.getVehicleModelById);

// Crear una nueva marca de vehículo
router.post("/vehicle-models", vehicleModelController.createVehicleModel);

// Actualizar una marca de vehículo por ID
router.put("/vehicle-models/:id", vehicleModelController.updateVehicleModel);

// Eliminar una marca de vehículo por ID
router.delete("/vehicle-models/:id", vehicleModelController.deleteVehicleModel);

export { router as vehicleModelRoutes };
