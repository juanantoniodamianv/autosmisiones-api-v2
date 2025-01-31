import { Router } from "express";
import { vehicleDataRoutes } from "./vehicleDataRoutes";

const apiRouter = Router();

apiRouter.use("/vehicles", vehicleDataRoutes);

export { apiRouter };
