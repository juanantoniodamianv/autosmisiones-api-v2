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

router.get("/people", personController.getAllPeople);
router.get("/people/:id", personController.getPersonById);
router.post("/people", personController.createPerson);
router.put("/people/:id", personController.updatePerson);
router.delete("/people/:id", personController.deletePerson);

export default router;
