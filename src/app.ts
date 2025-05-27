import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import swaggerOptions from "./swaggerConfig";
import { apiRouter, authRoutes } from "./routes";
import { initPassport } from "./passport";
import { API_URL, FRONTEND_URL, JWT_SECRET, PORT } from "./env";

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initPassport(app);

app.use(express.json());

// Allow requests from your frontend deployed URL with credentials
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser("SECRET_KEY"));

// API routes
app.use("/api", apiRouter);

// Authentication routes
app.use("/auth", authRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at ${API_URL}/api-docs`);
});
