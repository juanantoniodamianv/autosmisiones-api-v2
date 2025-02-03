import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";

import { apiRouter } from "./routes";
import { initPassport, isAuthenticated } from "./passport";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(
  session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false,
  })
);

initPassport(app);

app.post(
  "/api/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.json("You logged in!!!");
  }
);

app.get("/api/user", isAuthenticated, (req: Request, res: Response) => {
  res.send({ user: req.user });
});

// Google routes
app.get("/auth/google", passport.authenticate("google"));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// Facebook routes
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
