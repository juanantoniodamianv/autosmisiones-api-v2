import express from "express";
import { sequelize } from "./config/database";
import { cityRoutes } from "./routes/cityRoutes";
import { personRoutes } from "./routes/personRoutes";
import { favoriteRoutes } from "./routes/favoriteRoutes";
import { personMediaResourceRoutes } from "./routes/personMediaResourceRoutes";
import { phoneRoutes } from "./routes/phoneRoutes";
import { provinceRoutes } from "./routes/provinceRoutes";
import { publicationMediaResourceRoutes } from "./routes/publicationMediaResourceRoutes";
import { publicationRoutes } from "./routes/publicationRoutes";
import { statusRoutes } from "./routes/statusRoutes";
import { vehicleCategoryRoutes } from "./routes/vehicleCategoryRoutes";
import { vehicleCustomDataRoutes } from "./routes/vehicleCustomDataRoutes";
import { vehicleMakeRoutes } from "./routes/vehicleMakeRoutes";
import { vehicleModelRoutes } from "./routes/vehicleModelRoutes";
import { vehicleVersionRoutes } from "./routes/vehicleVersionRoutes";

// Importa otras rutas según sea necesario

async function syncDatabase() {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ force: true }); // Usa { force: true } solo en desarrollo
    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
}

const app = express();

app.use(express.json());

// Rutas
app.use("/api/cities", cityRoutes);
app.use("/api/people", personRoutes);
app.use("api/favorites", favoriteRoutes);
app.use("/api/personMediaResource", personMediaResourceRoutes);
app.use("/api/phone", phoneRoutes);
app.use("/api/province", provinceRoutes);
app.use("/api/publicationMediaResource", publicationMediaResourceRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/vehicleCategory", vehicleCategoryRoutes);
app.use("/api/vehicleCustomData", vehicleCustomDataRoutes);
app.use("/api/vehicleMake", vehicleMakeRoutes);
app.use("/api/vehicleModel", vehicleModelRoutes);
app.use("/api/vehicleVersion", vehicleVersionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

syncDatabase();
