import { Request, Response } from "express";
import { PublicationWithRelations } from "../types/publication";

export interface IPublicationService {
  findAll(query?: any): Promise<PublicationWithRelations[]>;
  findById(id: number): Promise<PublicationWithRelations | null>;
  findBySlug(slugUrl: string): Promise<PublicationWithRelations | null>;
  create(data: any, req?: Request): Promise<PublicationWithRelations>;
  update(id: number, data: any, req?: Request): Promise<PublicationWithRelations | null>;
  delete(id: number, req?: Request): Promise<void>;
  findOne(query: any): Promise<PublicationWithRelations | null>;
}

export class PublicationController {
  private publicationService: IPublicationService;

  constructor(publicationService: IPublicationService) {
    this.publicationService = publicationService;
  }

  getAllPublications = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        make,
        model,
        year,
        condition,
        minPrice,
        maxPrice,
        city,
        province,
        status,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Build where clause
      const where: any = {};

      if (category) {
        where.vehicleCategoryId = parseInt(category as string);
      }

      if (make) {
        where.vehicleMakeId = parseInt(make as string);
      }

      if (model) {
        where.vehicleModelId = parseInt(model as string);
      }

      if (year) {
        where.year = parseInt(year as string);
      }

      if (condition) {
        where.condition = condition;
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) {
          where.price.gte = parseFloat(minPrice as string);
        }
        if (maxPrice) {
          where.price.lte = parseFloat(maxPrice as string);
        }
      }

      if (city) {
        where.cityId = parseInt(city as string);
      }

      if (status) {
        where.statusId = parseInt(status as string);
      }

      // Get all publications with filters
      const publications = await this.publicationService.findAll(where);

      // Apply sorting
      const sortedPublications = publications.sort((a, b) => {
        let aValue: any = a[sortBy as keyof PublicationWithRelations];
        let bValue: any = b[sortBy as keyof PublicationWithRelations];

        // Handle date sorting
        if (aValue instanceof Date && bValue instanceof Date) {
          aValue = aValue.getTime();
          bValue = bValue.getTime();
        }

        // Handle string sorting
        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      // Apply pagination
      const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
      const endIndex = startIndex + parseInt(limit as string);
      const paginatedPublications = sortedPublications.slice(startIndex, endIndex);

      // Calculate pagination metadata
      const totalPublications = publications.length;
      const totalPages = Math.ceil(totalPublications / parseInt(limit as string));
      const hasNextPage = parseInt(page as string) < totalPages;
      const hasPrevPage = parseInt(page as string) > 1;

      res.json({
        publications: paginatedPublications,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages,
          totalPublications,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit as string),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching publications:", error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getPublicationBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slugUrl } = req.params;
      const publication = await this.publicationService.findBySlug(slugUrl);
      
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
  };

  createPublication = async (req: Request, res: Response) => {
    try {
      const publication = await this.publicationService.create(req.body, req);
      res.status(201).json(publication);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  updatePublication = async (req: Request, res: Response): Promise<void> => {
    try {
      const publicationId = parseInt(req.params.id);
      const publication = await this.publicationService.update(publicationId, req.body, req);
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

  deletePublication = async (req: Request, res: Response): Promise<void> => {
    try {
      const publicationId = parseInt(req.params.id);
      await this.publicationService.delete(publicationId, req);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
}
