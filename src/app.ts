import express from "express";
import { sequelize } from "./config/database";
import { cityRoutes } from "./routes/cityRoutes";
import { personRoutes } from "./routes/personRoutes";
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
// Agrega más rutas según sea necesario

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

syncDatabase();
