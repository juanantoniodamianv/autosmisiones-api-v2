import { Router } from "express";

import { vehicleDataRoutes } from "./vehicleDataRoutes";
import { locationRoutes } from "./locationRoutes";

const apiRouter = Router();

apiRouter.use("/vehicles", vehicleDataRoutes);
apiRouter.use("/locations", locationRoutes);

export { apiRouter };
