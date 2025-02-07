import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import { apiRouter, authRoutes } from "./routes";
import { initPassport } from "./passport";

// TODO: should we move these env to a file
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
