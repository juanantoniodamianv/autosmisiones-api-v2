// src/routes/personRoutes.ts
import express from "express";
import { personController } from "../controllers/PersonController";

const router = express.Router();

// Obtener todas las personas
router.get("/people", personController.getAllPeople);

// Obtener una persona por ID
router.get("/people/:id", personController.getPersonById);

// Crear una nueva persona
router.post("/people", personController.createPerson);

// Actualizar una persona por ID
router.put("/people/:id", personController.updatePerson);

// Eliminar una persona por ID
router.delete("/people/:id", personController.deletePerson);

export { router as personRoutes };
