// src/routes/phoneRoutes.ts
import express from "express";
import { phoneController } from "../controllers/PhoneController";

const router = express.Router();

// Obtener todos los teléfonos
router.get("/phones", phoneController.getAllPhones);

// Obtener un teléfono por ID
router.get("/phones/:id", phoneController.getPhoneById);

// Crear un nuevo teléfono
router.post("/phones", phoneController.createPhone);

// Actualizar un teléfono por ID
router.put("/phones/:id", phoneController.updatePhone);

// Eliminar un teléfono por ID
router.delete("/phones/:id", phoneController.deletePhone);

export { router as phoneRoutes };
