import express from "express";
import { cityRoutes } from "./routes/cityRoutes";
import { personRoutes } from "./routes/personRoutes";
// Importa otras rutas según sea necesario

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
