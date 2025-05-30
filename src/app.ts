import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { clerkAuth, syncClerkUser } from "./middlewares/clerkAuth";

import swaggerOptions from "./swaggerConfig";
import { apiRouter } from "./routes";
import { API_URL, FRONTEND_URL, PORT } from "./env";
import webhookRoutes from './routes/webhooks';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(express.json());

app.use('/api/webhooks', webhookRoutes);

// Allow requests from your frontend deployed URL with credentials
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// API routes with Clerk authentication
const authMiddleware = [clerkAuth, syncClerkUser] as express.RequestHandler[];
app.use("/api/protected", authMiddleware);

// Non-protected routes
app.use("/api", apiRouter);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at ${API_URL}/api-docs`);
});
