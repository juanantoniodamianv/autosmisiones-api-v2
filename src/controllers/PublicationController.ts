// src/controllers/PublicationController.ts
import { Request, Response } from "express";
import { Publication } from "../models/Publication";

class PublicationController {
  // Obtener todas las publicaciones
  public async getAllPublications(req: Request, res: Response): Promise<void> {
    try {
      const publications = await Publication.findAll();
      res.json(publications);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener una publicación por ID
  public async getPublicationById(req: Request, res: Response): Promise<void> {
    try {
      const publication = await Publication.findByPk(req.params.id);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear una nueva publicación
  public async createPublication(req: Request, res: Response): Promise<void> {
    try {
      const publication = await Publication.create(req.body);
      res.status(201).json(publication);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar una publicación por ID
  public async updatePublication(req: Request, res: Response): Promise<void> {
    try {
      const publication = await Publication.findByPk(req.params.id);
      if (publication) {
        await publication.update(req.body);
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar una publicación por ID
  public async deletePublication(req: Request, res: Response): Promise<void> {
    try {
      const publication = await Publication.findByPk(req.params.id);
      if (publication) {
        await publication.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
}

export const publicationController = new PublicationController();
