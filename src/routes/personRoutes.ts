import express from "express";

import { PersonController } from "../controllers/PersonController";
import { MockPersonService } from "../services/mock/mockPersonService";
import { PersonService } from "../services/personService";
import { requireAuth } from '../middlewares/auth';

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
 *     tags: [People]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", requireAuth, personController.getAllPeople);

/**
 * @swagger
 * /api/people/:id:
 *   get:
 *     summary: Get user by id
 *     tags: [People]
 *     responses:
 *       200:
 *         description: Get user by id
 */
router.get("/:id", requireAuth, personController.getPersonById);

/**
 * @swagger
 * /api/protected/people/:id:
 *   put:
 *     summary: Update user by id
 *     tags: [People]
 *     responses:
 *       200:
 *         description: Update user by id
 */
router.put("/:id", requireAuth, personController.updatePerson);

/**
 * @swagger
 * /api/people/:id:
 *   put:
 *     summary: Delete user by id
 *     tags: [People]
 *     responses:
 *       200:
 *         description: Delete user by id
 */
router.delete("/:id", requireAuth, personController.deletePerson);

export default router;
