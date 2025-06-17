import { Request, Response, NextFunction } from "express";
import { Publication } from "@prisma/client";

export interface IPublicationService {
  findAll(query?: any): Promise<Publication[]>;
  findById(id: number): Promise<any | null>;
  create(data: Partial<Publication>): Promise<Publication>;
  update(id: number, data: any): Promise<any | null>;
  delete(id:number): Promise<void>;
  //listPublications(filters: any): Promise<Publication[]>;
}

export class PublicationController {
  private publicationService: IPublicationService;

  constructor(publicationService: IPublicationService) {
    this.publicationService = publicationService;
  }

  /**
   * @desc    Get all publication
   * @route   GET /api/v1/publication
   */
 /* public getAllPublications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const publications = await this.publicationService.getAllPublications();
      res.status(200).json({
        success: true,
        count: publications.length,
        data: publications,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @desc    Get single publication by ID
   * @route   GET /api/v1/publication/:publicationId
   */
  public getPublicationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const publication = await this.publicationService.findById(
        parseInt(req.params.publicationId)
      )

      if (!publication) {
        return res.status(404).json({
          success: false,
          message: "Publication not found",
        });
      }

      res.status(200).json({
        success: true,
        data: publication,
      });
    } catch (err) {
      next(err);
    }
  };

/**
   * @desc    Create a new publication
   * @route   POST /api/v1/publication
   */
public createPublication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const publicationData: Partial<Publication> = req.body;
    const newPublication = await this.publicationService.create(publicationData);
    res.status(201).json({
      success: true,
      data: newPublication,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    List publications with filters
 * @route   GET /api/v1/publication/list
 */
public getAllPublications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userPublication,
      allStatusPublications,
      order,
      priceMin = 0,
      priceMax = 9999999999,
      yearMin = 0,
      yearMax = 9999,
      kmMin = 0,
      kmMax = 9999999999,
      category,
      make,
      model,
      condition,
      canceledStatus,
      title,
      limit = 20,
      skip = 0,
      allStatus = false,
      withPriceOnly = false,
      dolarValue = 1,
      marketDiscount,
    } = req.query;

    const filters: any = {};

    if (userPublication && !allStatusPublications) {
      filters.personId = Number(userPublication);
    }

    if (userPublication && allStatusPublications) {
      filters.personId = { not: Number(userPublication) };
    }

    if (title) {
      filters.OR = [
        { make: { name: { contains: title as string, mode: "insensitive" } } },
        { title: { contains: title as string, mode: "insensitive" } },
        { customMake: { contains: title as string, mode: "insensitive" } },
      ];
    }

    if (condition) {
      filters.condition = { contains: condition as string, mode: "insensitive" };
    }

    if (marketDiscount) {
      filters.marketDiscount = Number(marketDiscount);
    }

    if (category) {
      filters.vehicleCategoryId = Number(category);
    }

    if (make) {
      filters.makeId = Number(make);
    }

    if (model) {
      filters.modelId = Number(model);
    }

    if (!allStatus && !canceledStatus) {
      filters.statusId = 1;
    } else if (canceledStatus) {
      filters.statusId = 3;
    }

    if (withPriceOnly) {
      filters.price = { not: 0 };
    }

    filters.price = {
      OR: [
        { currencyType: "ARS$", price: { gte: Number(priceMin), lte: Number(priceMax) } },
        { currencyType: "US$", price: { gte: Math.floor(Number(priceMin) / Number(dolarValue)), lte: Math.floor(Number(priceMax) / Number(dolarValue)) } },
      ],
    };

    filters.km = { gte: Number(kmMin), lte: Number(kmMax) };
    filters.year = { gte: Number(yearMin), lte: Number(yearMax) };

    const publications = await this.publicationService.findAll({
      where: filters,
      take: Number(limit),
      skip: Number(skip),
      orderBy: order ? { [order as string]: "asc" } : undefined,
      include: {
        make: true,
        model: true,
        version: true,
        mediaResources: { take: 1 },
      },
    });

    res.json({ count: publications.length, data: publications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

public async updatePublication(req: Request, res: Response): Promise<void> {
  try {
    const publicationId = parseInt(req.params.id);
    const publication = await this.publicationService.findById(publicationId);
    if (publication) {
      await this.publicationService.update(publicationId, req.body);
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

public async deletePublication(req: Request, res: Response): Promise<void> {
  try {
    const publicationId = parseInt(req.params.id);
    const publication = await this.publicationService.findById(publicationId);
    if (publication) {
      await this.publicationService.delete(publicationId);
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