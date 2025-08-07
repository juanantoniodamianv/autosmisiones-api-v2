import express from "express";
import { PhoneController } from "../../controllers/PhoneController";
import { PhoneService } from "../../services/phoneService";
import { MockPhoneService } from "../../services/mock/mockPhoneService";
import { requireAuth } from '../../middlewares/auth';

const router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const phoneService = isTestEnvironment
  ? new MockPhoneService()
  : new PhoneService();

const phoneController = new PhoneController(phoneService);

/**
 * @swagger
 * /api/protected/phones:
 *   get:
 *     summary: Get all phones for the authenticated user
 *     description: Retrieve a list of all phone numbers associated with the authenticated user
 *     tags: [Phones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of phones retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Phone ID
 *                   number:
 *                     type: string
 *                     description: Phone number
 *                     example: "+54 9 11 1234-5678"
 *                   type:
 *                     type: string
 *                     description: Type of phone (mobile, landline, etc.)
 *                     example: "mobile"
 *                   isPrimary:
 *                     type: boolean
 *                     description: Whether this is the primary phone number
 *                     example: true
 *                   personId:
 *                     type: integer
 *                     description: ID of the person who owns this phone
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Phone creation timestamp
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update timestamp
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
router.get("/", requireAuth, phoneController.getAllPhones);

/**
 * @swagger
 * /api/protected/phones:
 *   post:
 *     summary: Create a new phone for the authenticated user
 *     description: Add a new phone number for the authenticated user
 *     tags: [Phones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number
 *                 example: "+54 9 11 1234-5678"
 *               type:
 *                 type: string
 *                 description: Type of phone (mobile, landline, etc.)
 *                 example: "mobile"
 *               isPrimary:
 *                 type: boolean
 *                 description: Whether this is the primary phone number
 *                 example: false
 *     responses:
 *       201:
 *         description: Phone created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Created phone ID
 *                 number:
 *                   type: string
 *                   description: Phone number
 *                 type:
 *                   type: string
 *                   description: Type of phone
 *                 isPrimary:
 *                   type: boolean
 *                   description: Whether this is the primary phone
 *                 personId:
 *                   type: integer
 *                   description: ID of the person who owns this phone
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
router.post("/", requireAuth, phoneController.createPhone);

/**
 * @swagger
 * /api/protected/phones/{id}:
 *   put:
 *     summary: Update a phone
 *     description: Update an existing phone number for the authenticated user
 *     tags: [Phones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The phone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number
 *                 example: "+54 9 11 1234-5678"
 *               type:
 *                 type: string
 *                 description: Type of phone (mobile, landline, etc.)
 *                 example: "mobile"
 *               isPrimary:
 *                 type: boolean
 *                 description: Whether this is the primary phone number
 *                 example: true
 *     responses:
 *       200:
 *         description: Phone updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Phone ID
 *                 number:
 *                   type: string
 *                   description: Updated phone number
 *                 type:
 *                   type: string
 *                   description: Updated phone type
 *                 isPrimary:
 *                   type: boolean
 *                   description: Updated primary status
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *       400:
 *         description: Bad request - Invalid data provided
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Phone not found
 *       500:
 *         description: Server error
 */
router.put("/:id", requireAuth, phoneController.updatePhone);

/**
 * @swagger
 * /api/protected/phones/{id}:
 *   delete:
 *     summary: Delete a phone
 *     description: Delete a phone number for the authenticated user
 *     tags: [Phones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The phone ID
 *     responses:
 *       204:
 *         description: Phone deleted successfully
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Phone not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", requireAuth, phoneController.deletePhone);

export default router; 