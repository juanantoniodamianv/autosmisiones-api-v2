import express from "express";

import { PersonController } from "../controllers/PersonController";
import { MockPersonService } from "../services/mock/mockPersonService";
import { PersonService } from "../services/personService";

const router = express.Router();

const isTestEnvironment = process.env.NODE_ENV === "test";
const personService = isTestEnvironment
  ? new MockPersonService()
  : new PersonService();

const personController = new PersonController(personService);

router.get("/", personController.getAllPeople);
router.get("/:id", personController.getPersonById);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

export default router;
