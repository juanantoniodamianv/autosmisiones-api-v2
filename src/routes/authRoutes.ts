import express, { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { isAuthenticated } from "../passport";
import { PersonController } from "../controllers/PersonController";
import { PersonService } from "../services/personService";
import { MockPersonService } from "../services/mock/mockPersonService";

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";

type CustomUser = Express.User & { id: string; providerId: string };

const isTestEnvironment = process.env.NODE_ENV === "test";
const personService = isTestEnvironment
  ? new MockPersonService()
  : new PersonService();

const personController = new PersonController(personService);

// Google authentication routes
router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/signin`,
  }),
  (req: Request, res: Response) => {
    const user = req.user as CustomUser;
    const token = jwt.sign(
      { id: user?.id, providerId: user?.providerId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
      path: "/",
    });

    res.redirect(FRONTEND_URL);
  }
);

// Facebook authentication routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${FRONTEND_URL}/signin`,
  }),
  (req: Request, res: Response) => {
    const user = req.user as CustomUser;
    const token = jwt.sign(
      { id: user?.id, providerId: user?.providerId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
      path: "/",
    });

    res.redirect(FRONTEND_URL);
  }
);

// Passport email/password login
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (err: unknown, user: CustomUser, info: { message: string }) => {
      if (err) return next(err);

      if (!user) return res.status(401).json({ message: info.message });

      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, providerId: null }, // No providerId since it's email/password login
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000,
        path: "/",
      });

      res.json({ message: "Login successful", token });
    }
  )(req, res, next);
});

router.post("/register", personController.signUp);

router.get("/removeSession", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect(FRONTEND_URL);
});

// Endpoint to know if user is authenticated
router.get("/check", isAuthenticated, (req: Request, res: Response) => {
  res.send({ user: req.user, authenticated: true });
});

export { router as authRoutes };
