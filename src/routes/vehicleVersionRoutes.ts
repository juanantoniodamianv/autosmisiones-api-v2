// src/routes/vehicleVersionRoutes.ts
import express from "express";
import { vehicleVersionController } from "../controllers/VehicleVersionController";

const router = express.Router();

// Obtener todas las versiones de vehículos
router.get("/vehicle-versions", vehicleVersionController.getAllVehicleVersions);

// Obtener una versión de vehículo por ID
router.get(
  "/vehicle-versions/:id",
  vehicleVersionController.getVehicleVersionById
);

// Crear una nueva versión de vehículo
router.post("/vehicle-versions", vehicleVersionController.createVehicleVersion);

// Actualizar una versión de vehículo por ID
router.put(
  "/vehicle-versions/:id",
  vehicleVersionController.updateVehicleVersion
);

// Eliminar una versión de vehículo por ID
router.delete(
  "/vehicle-versions/:id",
  vehicleVersionController.deleteVehicleVersion
);

export { router as vehicleVersionRoutes };
