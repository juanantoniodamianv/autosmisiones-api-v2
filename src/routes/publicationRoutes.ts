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
 *         description: List of all publications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The publication ID
 *                   title:
 *                     type: string
 *                     description: The publication title
 *                   description:
 *                     type: string
 *                     description: The publication description
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation timestamp
 *       500:
 *         description: Server error
 */
router.get("/", publicationController.getAllPublications);

/**
 * @swagger
 * /api/publications/slug/{slugUrl}:
 *   get:
 *     summary: Get publication by slug URL
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: slugUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The publication slug URL
 *     responses:
 *       200:
 *         description: Publication found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: The publication ID
 *                 title:
 *                   type: string
 *                   description: The publication title
 *                 slugUrl:
 *                   type: string
 *                   description: The publication slug URL
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Server error
 */
router.get("/slug/:slugUrl", (req, res) => {
  publicationController.getPublicationBySlug(req, res);
});

export default router;
