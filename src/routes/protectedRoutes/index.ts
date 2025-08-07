import { Router } from "express";

import personRoutes from "./protectedPersonRoutes";
import phoneRoutes from "./protectedPhoneRoutes";
import publicationRoutes from "./protectedPublicationRoutes";

const protectedRoutes = Router();

// Protected routes
protectedRoutes.use('/people', personRoutes);
protectedRoutes.use('/phones', phoneRoutes);
protectedRoutes.use('/publications', publicationRoutes);

export { protectedRoutes };