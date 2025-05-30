import { Router } from "express";

import personRoutes from "./personRoutes";

const protectedRoutes = Router();

// Protected routes
protectedRoutes.use('/people', personRoutes);

export { protectedRoutes };