import express from "express";

import { PublicationController } from "../controllers/PublicationController";
import { MockPublicationService } from "../services/mock/mockPublicationService";
import { PublicationService } from "../services/publicationService";

const router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const publicationService = isTestEnvironment
  ? new MockPublicationService()
  : new PublicationService();

const publicationController = new PublicationController(publicationService);

/**
 * @swagger
 * /api/publications:
 *   get:
 *     summary: Get all publications
 *     tags: [Publications]
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get("/", publicationController.getAllPublications);

//router.get("/:publicationId", publicationController.getPublicationById);
router.post("/", publicationController.createPublication);
router.put("/:id", publicationController.updatePublication);
router.delete("/:id", publicationController.deletePublication);


export default router;
