import express from "express";

import { PublicationController } from "../../controllers/PublicationController";
import { MockPublicationService } from "../../services/mock/mockPublicationService";
import { PublicationService } from "../../services/publicationService";
import { clerkAuth, syncClerkUser } from "../../middlewares/clerkAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const publicationService = isTestEnvironment
  ? new MockPublicationService()
  : new PublicationService();

const publicationController = new PublicationController(publicationService);

/**
 * @swagger
 * /api/protected/publications/statuses:
 *   get:
 *     summary: Get all available publication statuses
 *     description: Retrieve all available statuses for publications
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Status ID
 *                   name:
 *                     type: string
 *                     description: Status name
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.get("/statuses", clerkAuth, syncClerkUser, async (req, res) => {
  try {
    const statuses = await prisma.status.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(statuses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

/**
 * @swagger
 * /api/protected/publications/user/{personId}:
 *   get:
 *     summary: Get all publications for the authenticated user
 *     description: Retrieve all publications created by the authenticated user
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: personId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The person ID
 *     responses:
 *       200:
 *         description: List of user's publications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Publication ID
 *                   title:
 *                     type: string
 *                     description: Publication title
 *                   description:
 *                     type: string
 *                     description: Publication description
 *                   price:
 *                     type: number
 *                     description: Vehicle price
 *                   condition:
 *                     type: string
 *                     description: Vehicle condition
 *                   year:
 *                     type: number
 *                     description: Vehicle year
 *                   km:
 *                     type: number
 *                     description: Vehicle kilometers
 *                   statusId:
 *                     type: integer
 *                     description: Publication status
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation timestamp
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/user/:personId", clerkAuth, syncClerkUser, (req, res) => {
  publicationController.getMyPublications(req, res);
});


/**
 * @swagger
 * /api/protected/publications:
 *   post:
 *     summary: Create a new publication
 *     description: Create a new vehicle publication for the authenticated user
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - condition
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
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.post("/", clerkAuth, syncClerkUser, (req, res) => {
  publicationController.createPublication(req, res);
});

/**
 * @swagger
 * /api/protected/publications/{id}:
 *   patch:
 *     summary: Partially update a publication
 *     description: Update specific fields of an existing publication (only the owner can update their publications)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The publication title
 *                 example: "Toyota Corolla 2020 - Updated"
 *               description:
 *                 type: string
 *                 description: The publication description
 *                 example: "Excelente estado, único dueño, pocos km. Recién mantenido."
 *               price:
 *                 type: number
 *                 description: The vehicle price
 *                 example: 14500
 *               previousPrice:
 *                 type: number
 *                 description: The previous price before discount
 *                 example: 16000
 *               currencyType:
 *                 type: string
 *                 description: The currency type
 *                 example: "$"
 *               condition:
 *                 type: string
 *                 description: The vehicle condition
 *                 example: "Usado"
 *               year:
 *                 type: number
 *                 description: The vehicle year
 *                 example: 2020
 *               km:
 *                 type: number
 *                 description: The vehicle kilometers
 *                 example: 32000
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
 *               cityId:
 *                 type: number
 *                 description: The ID of the city where the vehicle is located
 *                 example: 1
 *               statusId:
 *                 type: number
 *                 description: The publication status ID
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
 *       200:
 *         description: Publication partially updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Publication ID
 *                 title:
 *                   type: string
 *                   description: Updated publication title
 *                 description:
 *                   type: string
 *                   description: Updated publication description
 *                 price:
 *                   type: number
 *                   description: Updated vehicle price
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request - Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - You can only update your own publications
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", clerkAuth, syncClerkUser, (req, res) => {
  publicationController.patchPublication(req, res);
});

/**
 * @swagger
 * /api/protected/publications/{id}:
 *   put:
 *     summary: Update a publication
 *     description: Update an existing publication (only the owner can update their publications)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The publication title
 *                 example: "Toyota Corolla 2020 - Updated"
 *               description:
 *                 type: string
 *                 description: The publication description
 *                 example: "Excelente estado, único dueño, pocos km. Recién mantenido."
 *               price:
 *                 type: number
 *                 description: The vehicle price
 *                 example: 14500
 *               condition:
 *                 type: string
 *                 description: The vehicle condition
 *                 example: "Usado"
 *               year:
 *                 type: number
 *                 description: The vehicle year
 *                 example: 2020
 *               km:
 *                 type: number
 *                 description: The vehicle kilometers
 *                 example: 32000
 *               statusId:
 *                 type: number
 *                 description: The publication status ID
 *                 example: 1
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Publication ID
 *                 title:
 *                   type: string
 *                   description: Updated publication title
 *                 description:
 *                   type: string
 *                   description: Updated publication description
 *                 price:
 *                   type: number
 *                   description: Updated vehicle price
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request - Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - You can only update your own publications
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Server error
 */
router.put("/:id", clerkAuth, syncClerkUser, (req, res) => {
  publicationController.updatePublication(req, res);
});

/**
 * @swagger
 * /api/protected/publications/{id}:
 *   delete:
 *     summary: Delete a publication
 *     description: Delete an existing publication (only the owner can delete their publications)
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The publication ID
 *     responses:
 *       204:
 *         description: Publication deleted successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - You can only delete your own publications
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", clerkAuth, syncClerkUser, (req, res) => {
  publicationController.deletePublication(req, res);
});

export default router;
