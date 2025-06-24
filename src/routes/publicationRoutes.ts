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
 * /api/publications:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - condition
 *               - slugUrl
 *               - personId
 *               - cityId
 *               - statusId
 *               - uniqueOwner
 *               - swap
 *               - marketDiscount
 *             properties:
 *               title:
 *                 type: string
 *                 description: The publication title
 *                 example: "Toyota Corolla 2020"
 *               description:
 *                 type: string
 *                 description: The publication description
 *                 example: "Excelente estado, único dueño, pocos km."
 *               price:
 *                 type: number
 *                 description: The vehicle price
 *                 example: 15000
 *               previousPrice:
 *                 type: number
 *                 description: The previous price before discount
 *                 example: 16000
 *               currencyType:
 *                 type: string
 *                 description: The currency type (e.g., "$", "ARS$", "US$")
 *                 example: "$"
 *               condition:
 *                 type: string
 *                 description: The vehicle condition (e.g., "Nuevo", "Usado")
 *                 example: "Usado"
 *               year:
 *                 type: number
 *                 description: The vehicle year
 *                 example: 2020
 *               km:
 *                 type: number
 *                 description: The vehicle kilometers
 *                 example: 30000
 *               color:
 *                 type: string
 *                 description: The vehicle color
 *                 example: "Blanco"
 *               neighborhood:
 *                 type: string
 *                 description: The neighborhood where the vehicle is located
 *                 example: "Palermo"
 *               transmission:
 *                 type: string
 *                 description: The transmission type
 *                 example: "Automática"
 *               engine:
 *                 type: string
 *                 description: The engine specification
 *                 example: "1.8L"
 *               fuelType:
 *                 type: string
 *                 description: The fuel type
 *                 example: "Nafta"
 *               doors:
 *                 type: string
 *                 description: The number of doors
 *                 example: "4"
 *               uniqueOwner:
 *                 type: boolean
 *                 description: Whether the vehicle has a unique owner
 *                 example: true
 *               slugUrl:
 *                 type: string
 *                 description: The URL slug for the publication
 *                 example: "toyota-corolla-2020"
 *               swap:
 *                 type: boolean
 *                 description: Whether the vehicle is available for swap
 *                 example: false
 *               ownerPhone:
 *                 type: string
 *                 description: The owner's phone number
 *                 example: "123-456-7890"
 *               marketDiscount:
 *                 type: boolean
 *                 description: Whether the publication has market discount
 *                 example: true
 *               personId:
 *                 type: number
 *                 description: The ID of the person creating the publication
 *                 example: 1
 *               cityId:
 *                 type: number
 *                 description: The ID of the city where the vehicle is located
 *                 example: 1
 *               statusId:
 *                 type: number
 *                 description: The publication status ID (1=Active, 2=Inactive, 3=Cancelled)
 *                 example: 1
 *               vehicleCategoryId:
 *                 type: number
 *                 description: The vehicle category ID
 *                 example: 1
 *               vehicleModelId:
 *                 type: number
 *                 description: The vehicle model ID
 *                 example: 2
 *               vehicleMakeId:
 *                 type: number
 *                 description: The vehicle make ID
 *                 example: 1
 *               vehicleVersionId:
 *                 type: number
 *                 description: The vehicle version ID
 *                 example: 3
 *     responses:
 *       201:
 *         description: Publication created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: The created publication ID
 *                 title:
 *                   type: string
 *                   description: The publication title
 *                 description:
 *                   type: string
 *                   description: The publication description
 *                 price:
 *                   type: number
 *                   description: The vehicle price
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request - Invalid data provided
 *       500:
 *         description: Server error
 */
router.post("/", (req, res) => {
  publicationController.createPublication(req, res);
});
// router.put("/:id", publicationController.updatePublication);
// router.delete("/:id", publicationController.deletePublication);

export default router;
