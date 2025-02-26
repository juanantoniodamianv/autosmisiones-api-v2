import { Router } from "express";

import { vehicleDataRoutes } from "./vehicleDataRoutes";
import { locationRoutes } from "./locationRoutes";
import { authRoutes } from "./authRoutes";
import personRoutes from "./personRoutes";

const apiRouter = Router();

apiRouter.use("/vehicles", vehicleDataRoutes);
apiRouter.use("/locations", locationRoutes);
apiRouter.use("/people", personRoutes);

export { apiRouter, authRoutes };
