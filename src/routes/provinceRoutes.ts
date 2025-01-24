// src/routes/provinceRoutes.ts
import express from "express";
import { provinceController } from "../controllers/ProvinceController";

const router = express.Router();

// Obtener todas las provincias
router.get("/provinces", provinceController.getAllProvinces);

// Obtener una provincia por ID
router.get("/provinces/:id", provinceController.getProvinceById);

// Crear una nueva provincia
router.post("/provinces", provinceController.createProvince);

// Actualizar una provincia por ID
router.put("/provinces/:id", provinceController.updateProvince);

// Eliminar una provincia por ID
router.delete("/provinces/:id", provinceController.deleteProvince);

export { router as provinceRoutes };
