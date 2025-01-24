// src/routes/favoriteRoutes.ts
import express from "express";
import { favoriteController } from "../controllers/FavoriteController";

const router = express.Router();

// Obtener todos los favoritos
router.get("/favorites", favoriteController.getAllFavorites);

// Obtener un favorito por ID
router.get("/favorites/:id", favoriteController.getFavoriteById);

// Crear un nuevo favorito
router.post("/favorites", favoriteController.createFavorite);

// Actualizar un favorito por ID
router.put("/favorites/:id", favoriteController.updateFavorite);

// Eliminar un favorito por ID
router.delete("/favorites/:id", favoriteController.deleteFavorite);

export { router as favoriteRoutes };
