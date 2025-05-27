import { NextFunction, Request, Response } from "express";

export interface IPublicationService {
  findAll(query?: any): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any | null>;
  delete(id: number): Promise<void>;
  findOne(query: any): Promise<any | null>;
}

export class PublicationController {
  private publicationService: IPublicationService;

  constructor(publicationService: IPublicationService) {
    console.log("llega" + JSON.stringify(publicationService));
    this.publicationService = publicationService;
  }

  getAllPublications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // const {
        //     userPublication,
        //     allStatusPublications,
            // order,
        //     priceMin = 0,
        //     priceMax = 9999999999,
        //     yearMin = 0,
        //     yearMax = 9999,
        //     kmMin = 0,
        //     kmMax = 999999,
        //     category,
        //     make,
        //     model,
        //     condition,
        //     canceledStatus,
        //     title,
            // limit = 20,
            // skip = 0,
        //     allStatus = false,
        //     withPriceOnly = false,
        //     dolarValue = 1,
        //     marketDiscount,
          // } = req.query;

        // // Convertir parámetros que deberían ser números
        // const parsedLimit = parseInt(limit as string, 10) || 20;
        // const parsedSkip = parseInt(skip as string, 10) || 0;
        // const parsedDolarValue = parseFloat(dolarValue as string) || 1;
        // const parsedPriceMin = Math.floor(parseFloat(priceMin as string) || 0);
        // const parsedPriceMax = Math.floor(parseFloat(priceMax as string) || 9999999999);
        // const parsedPriceMinUSD = Math.floor(parsedPriceMin / parsedDolarValue);
        // const parsedPriceMaxUSD = Math.floor(parsedPriceMax / parsedDolarValue);

        // const filters: any = {
        //     AND: [
        //       {
        //         OR: [
        //           {
        //             AND: [{ currencyType: "ARS$" }, { price: { gte: parsedPriceMin, lte: parsedPriceMax } }],
        //           },
        //           {
        //             AND: [{ currencyType: "US$" }, { price: { gte: parsedPriceMinUSD, lte: parsedPriceMaxUSD } }],
        //           },
        //         ],
        //       },
        //       { km: { gte: parseInt(kmMin as string) || 0, lte: parseInt(kmMax as string) || 999999 } },
        //       { year: { gte: parseInt(yearMin as string) || 0, lte: parseInt(yearMax as string) || 9999 } },
        //     ],
        //   };

        //   if (userPublication && !allStatusPublications) {
        //     filters.AND.push({ personId: parseInt(userPublication as string) });
        //   }
    
        //   if (userPublication && allStatusPublications) {
        //     filters.AND.push({ personId: { not: parseInt(userPublication as string) } });
        //   }
    
        //   if (title) {
        //     filters.AND.push({
        //       OR: [
        //         { make: { name: { contains: title as string, mode: "insensitive" } } },
        //         { title: { contains: title as string, mode: "insensitive" } },
        //         { custom: { make: { contains: title as string, mode: "insensitive" } } },
        //       ],
        //     });
        //   }
    
        //   if (condition) {
        //     filters.AND.push({ condition: { contains: condition as string, mode: "insensitive" } });
        //   }
    
        //   if (marketDiscount) {
        //     filters.AND.push({ marketDiscount: parseInt(marketDiscount as string) });
        //   }
    
        //   if (category) {
        //     filters.AND.push({ vehicleCategoryId: parseInt(category as string) });
        //   }
    
        //   if (make) {
        //     filters.AND.push({ makeId: parseInt(make as string) });
        //   }
    
        //   if (model) {
        //     filters.AND.push({ modelId: parseInt(model as string) });
        //   }
    
        //   if (!allStatus && !canceledStatus) {
        //     filters.AND.push({ statusid: 1 });
        //   } else if (canceledStatus) {
        //     filters.AND.push({ statusid: 3 });
        //   }
    
        //   if (withPriceOnly) {
        //     filters.AND.push({ price: { not: 0 } });
          // }
    

          const publications = await this.publicationService.findAll({
              // where: filters,
            include: {
              // make: true,
              // model: true,
              // version: true,
              // custom: true,
              mediaResources: {
                take: 1, // Obtener solo la primera imagen
              },
              // favorite: userPublication
              //   ? {
              //       where: { personId: parseInt(userPublication as string) },
              //       select: { id: true },
              //     }
              //   : false,
            },
          //  orderBy: order ? { [order as string]: "asc" } : undefined,
          //  take: parsedLimit,
           // skip: parsedSkip,
          });
    
          res.json(publications);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error fetching publications:", error);
            res.status(500).json({ error: error.message });
          } else {
            res.status(500).json({ error: "An unknown error occurred" });
          }
        }
      }

  // public async getPublicationById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const publication = await this.publicationService.findById(parseInt(req.params.id));
  //     if (publication) {
  //       res.json(publication);
  //     } else {
  //       res.status(404).json({ error: "Publication not found" });
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ error: error.message });
  //     } else {
  //       res.status(500).json({ error: "An unknown error occurred" });
  //     }
  //   }
  // }

  // public async createPublication(req: Request, res: Response): Promise<void> {
  //   try {
  //     const publication = await this.publicationService.create(req.body);
  //     res.status(201).json(publication);
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ error: error.message });
  //     } else {
  //       res.status(500).json({ error: "An unknown error occurred" });
  //     }
  //   }
  // }

  // public async updatePublication(req: Request, res: Response): Promise<void> {
  //   try {
  //     const publicationId = parseInt(req.params.id);
  //     const publication = await this.publicationService.findById(publicationId);
  //     if (publication) {
  //       await this.publicationService.update(publicationId, req.body);
  //       res.json(publication);
  //     } else {
  //       res.status(404).json({ error: "Publication not found" });
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ error: error.message });
  //     } else {
  //       res.status(500).json({ error: "An unknown error occurred" });
  //     }
  //   }
  // }

  // public async deletePublication(req: Request, res: Response): Promise<void> {
  //   try {
  //     const publicationId = parseInt(req.params.id);
  //     const publication = await this.publicationService.findById(publicationId);
  //     if (publication) {
  //       await this.publicationService.delete(publicationId);
  //       res.status(204).send();
  //     } else {
  //       res.status(404).json({ error: "Publication not found" });
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res.status(500).json({ error: error.message });
  //     } else {
  //       res.status(500).json({ error: "An unknown error occurred" });
  //     }
  //   }
  // }

  
}
