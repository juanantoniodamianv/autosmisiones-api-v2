// src/routes/statusRoutes.ts
import express from "express";
import { statusController } from "../controllers/StatusController";

const router = express.Router();

// Obtener todos los estados
router.get("/statuses", statusController.getAllStatuses);

// Obtener un estado por ID
router.get("/statuses/:id", statusController.getStatusById);

// Crear un nuevo estado
router.post("/statuses", statusController.createStatus);

// Actualizar un estado por ID
router.put("/statuses/:id", statusController.updateStatus);

// Eliminar un estado por ID
router.delete("/statuses/:id", statusController.deleteStatus);

export { router as statusRoutes };
