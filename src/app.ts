import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";

import { initPassport, isAuthenticated } from "./passport";

// import { cityRoutes } from "./routes/cityRoutes";
import { personRoutes } from "./routes/personRoutes";
// import { favoriteRoutes } from "./routes/favoriteRoutes";
// import { personMediaResourceRoutes } from "./routes/personMediaResourceRoutes";
// import { phoneRoutes } from "./routes/phoneRoutes";
// import { provinceRoutes } from "./routes/provinceRoutes";
// import { publicationMediaResourceRoutes } from "./routes/publicationMediaResourceRoutes";
// import { publicationRoutes } from "./routes/publicationRoutes";
// import { statusRoutes } from "./routes/statusRoutes";
// import { vehicleCategoryRoutes } from "./routes/vehicleCategoryRoutes";
// import { vehicleCustomDataRoutes } from "./routes/vehicleCustomDataRoutes";
// import { vehicleMakeRoutes } from "./routes/vehicleMakeRoutes";
// import { vehicleModelRoutes } from "./routes/vehicleModelRoutes";
// import { vehicleVersionRoutes } from "./routes/vehicleVersionRoutes";

const app = express();

app.use(express.json());

// Rutas
// app.use("/api/cities", cityRoutes);
app.use("/api/people", personRoutes);
// app.use("api/favorites", favoriteRoutes);
// app.use("/api/personMediaResource", personMediaResourceRoutes);
// app.use("/api/phone", phoneRoutes);
// app.use("/api/province", provinceRoutes);
// app.use("/api/publicationMediaResource", publicationMediaResourceRoutes);
// app.use("/api/publication", publicationRoutes);
// app.use("/api/status", statusRoutes);
// app.use("/api/vehicleCategory", vehicleCategoryRoutes);
// app.use("/api/vehicleCustomData", vehicleCustomDataRoutes);
// app.use("/api/vehicleMake", vehicleMakeRoutes);
// app.use("/api/vehicleModel", vehicleModelRoutes);
// app.use("/api/vehicleVersion", vehicleVersionRoutes);

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
