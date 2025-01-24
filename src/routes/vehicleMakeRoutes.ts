// src/routes/vehicleMakeRoutes.ts
import express from "express";
import { vehicleMakeController } from "../controllers/VehicleMakeController";

const router = express.Router();

// Obtener todas las marcas de vehículos
router.get("/vehicle-makes", vehicleMakeController.getAllVehicleMakes);

// Obtener una marca de vehículo por ID
router.get("/vehicle-makes/:id", vehicleMakeController.getVehicleMakeById);

// Crear una nueva marca de vehículo
router.post("/vehicle-makes", vehicleMakeController.createVehicleMake);

// Actualizar una marca de vehículo por ID
router.put("/vehicle-makes/:id", vehicleMakeController.updateVehicleMake);

// Eliminar una marca de vehículo por ID
router.delete("/vehicle-makes/:id", vehicleMakeController.deleteVehicleMake);

export { router as vehicleMakeRoutes };
