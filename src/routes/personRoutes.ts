import express from "express";
import { personController } from "../controllers/PersonController";

const router = express.Router();

router.get("/people", personController.getAllPeople);
router.get("/people/:id", personController.getPersonById);
router.post("/people", personController.createPerson);
router.put("/people/:id", personController.updatePerson);
router.delete("/people/:id", personController.deletePerson);

export default router;
