// src/routes/publicationMediaResourceRoutes.ts
import express from "express";
import { publicationMediaResourceController } from "../controllers/PublicationMediaResourceController";

const router = express.Router();

// Obtener todos los recursos multimedia de publicaciones
router.get(
  "/publication-media-resources",
  publicationMediaResourceController.getAllPublicationMediaResources
);

// Obtener un recurso multimedia de publicación por ID
router.get(
  "/publication-media-resources/:id",
  publicationMediaResourceController.getPublicationMediaResourceById
);

// Crear un nuevo recurso multimedia de publicación
router.post(
  "/publication-media-resources",
  publicationMediaResourceController.createPublicationMediaResource
);

// Actualizar un recurso multimedia de publicación por ID
router.put(
  "/publication-media-resources/:id",
  publicationMediaResourceController.updatePublicationMediaResource
);

// Eliminar un recurso multimedia de publicación por ID
router.delete(
  "/publication-media-resources/:id",
  publicationMediaResourceController.deletePublicationMediaResource
);

export { router as publicationMediaResourceRoutes };
