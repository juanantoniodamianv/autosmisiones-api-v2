// src/routes/publicationRoutes.ts
import express from "express";
import { publicationController } from "../controllers/PublicationController";

const router = express.Router();

// Obtener todas las publicaciones
router.get("/publications", publicationController.getAllPublications);

// Obtener una publicación por ID
router.get("/publications/:id", publicationController.getPublicationById);

// Crear una nueva publicación
router.post("/publications", publicationController.createPublication);

// Actualizar una publicación por ID
router.put("/publications/:id", publicationController.updatePublication);

// Eliminar una publicación por ID
router.delete("/publications/:id", publicationController.deletePublication);

export { router as publicationRoutes };
