// src/routes/personMediaResourceRoutes.ts
import express from "express";
import { personMediaResourceController } from "../controllers/PersonMediaResourceController";

const router = express.Router();

// Obtener todos los recursos multimedia de personas
router.get(
  "/person-media-resources",
  personMediaResourceController.getAllPersonMediaResources
);

// Obtener un recurso multimedia de persona por ID
router.get(
  "/person-media-resources/:id",
  personMediaResourceController.getPersonMediaResourceById
);

// Crear un nuevo recurso multimedia de persona
router.post(
  "/person-media-resources",
  personMediaResourceController.createPersonMediaResource
);

// Actualizar un recurso multimedia de persona por ID
router.put(
  "/person-media-resources/:id",
  personMediaResourceController.updatePersonMediaResource
);

// Eliminar un recurso multimedia de persona por ID
router.delete(
  "/person-media-resources/:id",
  personMediaResourceController.deletePersonMediaResource
);

export { router as personMediaResourceRoutes };
