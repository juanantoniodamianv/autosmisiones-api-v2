import { Router } from "express";

import { vehicleDataRoutes } from "./vehicleDataRoutes";
import { locationRoutes } from "./locationRoutes";
import { protectedRoutes } from "./protectedRoutes";
import publicationRoutes from "./publicationRoutes";

const apiRouter = Router();

// Protected routes
apiRouter.use('/protected', protectedRoutes);

// Public routes
apiRouter.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});
apiRouter.use("/vehicles", vehicleDataRoutes);
apiRouter.use("/locations", locationRoutes);
apiRouter.use("/publications", publicationRoutes);

export { apiRouter };
