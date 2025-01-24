// src/controllers/PublicationMediaResourceController.ts
import { Request, Response } from "express";
import { PublicationMediaResource } from "../models/PublicationMediaResource";

class PublicationMediaResourceController {
  // Obtener todos los recursos multimedia de publicaciones
  public async getAllPublicationMediaResources(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResources = await PublicationMediaResource.findAll();
      res.json(mediaResources);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Obtener un recurso multimedia de publicación por ID
  public async getPublicationMediaResourceById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PublicationMediaResource.findByPk(
        req.params.id
      );
      if (mediaResource) {
        res.json(mediaResource);
      } else {
        res.status(404).json({ error: "PublicationMediaResource not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Crear un nuevo recurso multimedia de publicación
  public async createPublicationMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PublicationMediaResource.create(req.body);
      res.status(201).json(mediaResource);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Actualizar un recurso multimedia de publicación por ID
  public async updatePublicationMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PublicationMediaResource.findByPk(
        req.params.id
      );
      if (mediaResource) {
        await mediaResource.update(req.body);
        res.json(mediaResource);
      } else {
        res.status(404).json({ error: "PublicationMediaResource not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  // Eliminar un recurso multimedia de publicación por ID
  public async deletePublicationMediaResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const mediaResource = await PublicationMediaResource.findByPk(
        req.params.id
      );
      if (mediaResource) {
        await mediaResource.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "PublicationMediaResource not found" });
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

export const publicationMediaResourceController =
  new PublicationMediaResourceController();
