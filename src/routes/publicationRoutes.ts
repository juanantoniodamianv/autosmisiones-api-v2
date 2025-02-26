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

router.get("/", publicationController.getAllPublications);
router.post("/publication", publicationController.createPublication);
router.put("/publication/:id", publicationController.updatePublication);
router.delete("/publication/:id", publicationController.deletePublication);

export default router;
