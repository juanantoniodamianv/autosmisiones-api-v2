// src/routes/vehicleCategoryRoutes.ts
import express from "express";
import { vehicleCategoryController } from "../controllers/VehicleCategoryController";

const router = express.Router();

// Obtener todas las categorías de vehículos
router.get(
  "/vehicle-categories",
  vehicleCategoryController.getAllVehicleCategories
);

// Obtener una categoría de vehículo por ID
router.get(
  "/vehicle-categories/:id",
  vehicleCategoryController.getVehicleCategoryById
);

// Crear una nueva categoría de vehículo
router.post(
  "/vehicle-categories",
  vehicleCategoryController.createVehicleCategory
);

// Actualizar una categoría de vehículo por ID
router.put(
  "/vehicle-categories/:id",
  vehicleCategoryController.updateVehicleCategory
);

// Eliminar una categoría de vehículo por ID
router.delete(
  "/vehicle-categories/:id",
  vehicleCategoryController.deleteVehicleCategory
);

export { router as vehicleCategoryRoutes };
