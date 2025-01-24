// src/routes/vehicleCustomDataRoutes.ts
import express from "express";
import { vehicleCustomDataController } from "../controllers/VehicleCustomDataController";

const router = express.Router();

// Obtener todos los datos personalizados de vehículos
router.get(
  "/vehicle-custom-data",
  vehicleCustomDataController.getAllVehicleCustomData
);

// Obtener datos personalizados de un vehículo por ID
router.get(
  "/vehicle-custom-data/:id",
  vehicleCustomDataController.getVehicleCustomDataById
);

// Crear nuevos datos personalizados para un vehículo
router.post(
  "/vehicle-custom-data",
  vehicleCustomDataController.createVehicleCustomData
);

// Actualizar datos personalizados de un vehículo por ID
router.put(
  "/vehicle-custom-data/:id",
  vehicleCustomDataController.updateVehicleCustomData
);

// Eliminar datos personalizados de un vehículo por ID
router.delete(
  "/vehicle-custom-data/:id",
  vehicleCustomDataController.deleteVehicleCustomData
);

export { router as vehicleCustomDataRoutes };
