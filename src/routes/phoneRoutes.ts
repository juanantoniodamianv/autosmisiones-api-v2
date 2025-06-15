import express from "express";
import { PhoneController } from "../controllers/PhoneController";
import { PhoneService } from "../services/phoneService";
import { MockPhoneService } from "../services/mock/mockPhoneService";
import { requireAuth } from '../middlewares/auth';

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
 *     tags: [Phones]
 *     responses:
 *       200:
 *         description: List of phones
 */
router.get("/", requireAuth, phoneController.getAllPhones);

/**
 * @swagger
 * /api/protected/phones:
 *   post:
 *     summary: Create a new phone for the authenticated user
 *     tags: [Phones]
 *     responses:
 *       201:
 *         description: Phone created successfully
 */
router.post("/", requireAuth, phoneController.createPhone);

/**
 * @swagger
 * /api/protected/phones/:id:
 *   put:
 *     summary: Update a phone
 *     tags: [Phones]
 *     responses:
 *       200:
 *         description: Phone updated successfully
 */
router.put("/:id", requireAuth, phoneController.updatePhone);

/**
 * @swagger
 * /api/protected/phones/:id:
 *   delete:
 *     summary: Delete a phone
 *     tags: [Phones]
 *     responses:
 *       204:
 *         description: Phone deleted successfully
 */
router.delete("/:id", requireAuth, phoneController.deletePhone);

export default router; 