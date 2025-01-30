// // src/controllers/FavoriteController.ts
// import { Request, Response } from "express";
// import { Favorite } from "../models/Favorite";

// class FavoriteController {
//   // Obtener todos los favoritos
//   public async getAllFavorites(req: Request, res: Response): Promise<void> {
//     try {
//       const favorites = await Favorite.findAll();
//       res.json(favorites);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Obtener un favorito por ID
//   public async getFavoriteById(req: Request, res: Response): Promise<void> {
//     try {
//       const favorite = await Favorite.findByPk(req.params.id);
//       if (favorite) {
//         res.json(favorite);
//       } else {
//         res.status(404).json({ error: "Favorite not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Crear un nuevo favorito
//   public async createFavorite(req: Request, res: Response): Promise<void> {
//     try {
//       const favorite = await Favorite.create(req.body);
//       res.status(201).json(favorite);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Actualizar un favorito por ID
//   public async updateFavorite(req: Request, res: Response): Promise<void> {
//     try {
//       const favorite = await Favorite.findByPk(req.params.id);
//       if (favorite) {
//         await favorite.update(req.body);
//         res.json(favorite);
//       } else {
//         res.status(404).json({ error: "Favorite not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Eliminar un favorito por ID
//   public async deleteFavorite(req: Request, res: Response): Promise<void> {
//     try {
//       const favorite = await Favorite.findByPk(req.params.id);
//       if (favorite) {
//         await favorite.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ error: "Favorite not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }
// }

// export const favoriteController = new FavoriteController();
