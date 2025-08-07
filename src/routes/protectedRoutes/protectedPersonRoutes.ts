import express from "express";

import { PersonController } from "../../controllers/PersonController";
import { MockPersonService } from "../../services/mock/mockPersonService";
import { PersonService } from "../../services/personService";
import { requireAuth } from '../../middlewares/auth';

const router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const personService = isTestEnvironment
  ? new MockPersonService()
  : new PersonService();

const personController = new PersonController(personService);

/**
 * @swagger
 * /api/protected/people:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (requires authentication)
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User's full name
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: User's email address
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: User creation timestamp
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.get("/", requireAuth, personController.getAllPeople);

/**
 * @swagger
 * /api/protected/people/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their ID (requires authentication)
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User's full name
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: User creation timestamp
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id", requireAuth, personController.getPersonById);

/**
 * @swagger
 * /api/protected/people/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update a specific user's information (requires authentication)
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: Updated user name
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Updated user email
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request - Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id", requireAuth, personController.updatePerson);

/**
 * @swagger
 * /api/protected/people/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a specific user (requires authentication)
 *     tags: [People]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", requireAuth, personController.deletePerson);

export default router;
