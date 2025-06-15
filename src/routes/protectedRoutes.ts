import { Router } from "express";

import personRoutes from "./personRoutes";
import phoneRoutes from "./phoneRoutes";

const protectedRoutes = Router();

// Protected routes
protectedRoutes.use('/people', personRoutes);
protectedRoutes.use('/phones', phoneRoutes);

export { protectedRoutes };