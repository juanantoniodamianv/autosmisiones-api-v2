import { IPublicationService } from "../controllers/PublicationController";
import { PublicationRepository } from "../repositories/Publication";
import { Request } from "express";
import { generatePublicationSlug, cleanPublicationData } from "../utils";
import { prisma } from "../repositories/base";
import { PublicationWithRelations } from "../types";

export class PublicationService implements IPublicationService {
  publication = new PublicationRepository();

  async findAll(query?: any): Promise<PublicationWithRelations[]> {
    return await this.publication.findAll(query);
  }

  async findById(id: number): Promise<PublicationWithRelations | null> {
    return await this.publication.findById(id);
  }

  async findBySlug(slugUrl: string): Promise<PublicationWithRelations | null> {
    return await this.publication.findBySlug(slugUrl);
  }

  async findOne(query?: any): Promise<PublicationWithRelations | null> {
    return await this.publication.findOne(query);
  }

  async create(data: any, req?: Request): Promise<PublicationWithRelations> {
    // Validate authentication
    const personId = req?.person?.id;
    if (!personId) {
      throw new Error("User not authenticated");
    }

    // Add personId from authenticated user
    data.personId = personId;

    // Clean the data using utility
    const cleanedData = cleanPublicationData(data);

    // Validate required fields
    const requiredFields = ['title', 'condition', 'cityId', 'statusId'];
    const missingFields = requiredFields.filter(field => !cleanedData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Generate slugUrl automatically if not provided
    if (!cleanedData.slugUrl) {
      let makeName: string | undefined;
      let modelName: string | undefined;
      const year: number = cleanedData.year;

      // If we have vehicle IDs, fetch the names
      if (cleanedData.vehicleMakeId) {
        const make = await prisma.vehicleMake.findUnique({
          where: { id: cleanedData.vehicleMakeId }
        });
        makeName = make?.name;
      }

      if (cleanedData.vehicleModelId) {
        const model = await prisma.vehicleModel.findUnique({
          where: { id: cleanedData.vehicleModelId }
        });
        modelName = model?.name;
      }

      cleanedData.slugUrl = await generatePublicationSlug(
        makeName,
        modelName,
        year,
        cleanedData.title
      );
    }

    return await this.publication.create(cleanedData);
  }

  async update(id: number, data: any, req?: Request): Promise<PublicationWithRelations | null> {
    // Validate authentication
    const personId = req?.person?.id;
    if (!personId) {
      throw new Error("User not authenticated");
    }

    // Verify ownership
    const existingPublication = await this.publication.findById(id);
    if (!existingPublication) {
      throw new Error("Publication not found");
    }

    if (existingPublication.personId !== personId) {
      throw new Error("Unauthorized: You can only update your own publications");
    }

    // Clean the data using utility
    const cleanedData = cleanPublicationData(data);

    // Validate foreign key constraints before updating
    if (cleanedData.statusId) {
      const statusExists = await prisma.status.findUnique({
        where: { id: cleanedData.statusId }
      });
      if (!statusExists) {
        throw new Error(`Status with ID ${cleanedData.statusId} does not exist`);
      }
    }

    if (cleanedData.cityId) {
      const cityExists = await prisma.city.findUnique({
        where: { id: cleanedData.cityId }
      });
      if (!cityExists) {
        throw new Error(`City with ID ${cleanedData.cityId} does not exist`);
      }
    }

    if (cleanedData.vehicleCategoryId) {
      const categoryExists = await prisma.vehicleCategory.findUnique({
        where: { id: cleanedData.vehicleCategoryId }
      });
      if (!categoryExists) {
        throw new Error(`Vehicle category with ID ${cleanedData.vehicleCategoryId} does not exist`);
      }
    }

    if (cleanedData.vehicleMakeId) {
      const makeExists = await prisma.vehicleMake.findUnique({
        where: { id: cleanedData.vehicleMakeId }
      });
      if (!makeExists) {
        throw new Error(`Vehicle make with ID ${cleanedData.vehicleMakeId} does not exist`);
      }
    }

    if (cleanedData.vehicleModelId) {
      const modelExists = await prisma.vehicleModel.findUnique({
        where: { id: cleanedData.vehicleModelId }
      });
      if (!modelExists) {
        throw new Error(`Vehicle model with ID ${cleanedData.vehicleModelId} does not exist`);
      }
    }

    if (cleanedData.vehicleVersionId) {
      const versionExists = await prisma.vehicleVersion.findUnique({
        where: { id: cleanedData.vehicleVersionId }
      });
      if (!versionExists) {
        throw new Error(`Vehicle version with ID ${cleanedData.vehicleVersionId} does not exist`);
      }
    }

    // If updating vehicle data or title, regenerate slug
    if (cleanedData.vehicleMakeId || cleanedData.vehicleModelId || cleanedData.year || cleanedData.title) {
      let makeName: string | undefined;
      let modelName: string | undefined;
      const year: number | undefined = cleanedData.year || existingPublication.year;

      // Use new data or fall back to current data
      if (cleanedData.vehicleMakeId) {
        const make = await prisma.vehicleMake.findUnique({
          where: { id: cleanedData.vehicleMakeId }
        });
        makeName = make?.name;
      } else {
        makeName = existingPublication.vehicleMake?.name;
      }

      if (cleanedData.vehicleModelId) {
        const model = await prisma.vehicleModel.findUnique({
          where: { id: cleanedData.vehicleModelId }
        });
        modelName = model?.name;
      } else {
        modelName = existingPublication.vehicleModel?.name;
      }

      cleanedData.slugUrl = await generatePublicationSlug(
        makeName,
        modelName,
        year,
        cleanedData.title || existingPublication.title
      );
    }

    return await this.publication.update(id, cleanedData);
  }

  async patch(id: number, data: any, req?: Request): Promise<PublicationWithRelations | null> {
    // Validate authentication
    const personId = req?.person?.id;
    if (!personId) {
      throw new Error("User not authenticated");
    }

    // Verify ownership
    const existingPublication = await this.publication.findById(id);
    if (!existingPublication) {
      throw new Error("Publication not found");
    }

    if (existingPublication.personId !== personId) {
      throw new Error("Unauthorized: You can only update your own publications");
    }

    // Clean the data using utility (only the provided fields)
    const cleanedData = cleanPublicationData(data);

    // Validate foreign key constraints before updating
    if (cleanedData.statusId) {
      const statusExists = await prisma.status.findUnique({
        where: { id: cleanedData.statusId }
      });
      if (!statusExists) {
        throw new Error(`Status with ID ${cleanedData.statusId} does not exist`);
      }
    }

    if (cleanedData.cityId) {
      const cityExists = await prisma.city.findUnique({
        where: { id: cleanedData.cityId }
      });
      if (!cityExists) {
        throw new Error(`City with ID ${cleanedData.cityId} does not exist`);
      }
    }

    if (cleanedData.vehicleCategoryId) {
      const categoryExists = await prisma.vehicleCategory.findUnique({
        where: { id: cleanedData.vehicleCategoryId }
      });
      if (!categoryExists) {
        throw new Error(`Vehicle category with ID ${cleanedData.vehicleCategoryId} does not exist`);
      }
    }

    if (cleanedData.vehicleMakeId) {
      const makeExists = await prisma.vehicleMake.findUnique({
        where: { id: cleanedData.vehicleMakeId }
      });
      if (!makeExists) {
        throw new Error(`Vehicle make with ID ${cleanedData.vehicleMakeId} does not exist`);
      }
    }

    if (cleanedData.vehicleModelId) {
      const modelExists = await prisma.vehicleModel.findUnique({
        where: { id: cleanedData.vehicleModelId }
      });
      if (!modelExists) {
        throw new Error(`Vehicle model with ID ${cleanedData.vehicleModelId} does not exist`);
      }
    }

    if (cleanedData.vehicleVersionId) {
      const versionExists = await prisma.vehicleVersion.findUnique({
        where: { id: cleanedData.vehicleVersionId }
      });
      if (!versionExists) {
        throw new Error(`Vehicle version with ID ${cleanedData.vehicleVersionId} does not exist`);
      }
    }

    // If updating vehicle data or title, regenerate slug
    if (cleanedData.vehicleMakeId || cleanedData.vehicleModelId || cleanedData.year || cleanedData.title) {
      let makeName: string | undefined;
      let modelName: string | undefined;
      const year: number | undefined = cleanedData.year || existingPublication.year;

      // Use new data or fall back to current data
      if (cleanedData.vehicleMakeId) {
        const make = await prisma.vehicleMake.findUnique({
          where: { id: cleanedData.vehicleMakeId }
        });
        makeName = make?.name;
      } else {
        makeName = existingPublication.vehicleMake?.name;
      }

      if (cleanedData.vehicleModelId) {
        const model = await prisma.vehicleModel.findUnique({
          where: { id: cleanedData.vehicleModelId }
        });
        modelName = model?.name;
      } else {
        modelName = existingPublication.vehicleModel?.name;
      }

      cleanedData.slugUrl = await generatePublicationSlug(
        makeName,
        modelName,
        year,
        cleanedData.title || existingPublication.title
      );
    }

    return await this.publication.update(id, cleanedData);
  }

  async delete(id: number, req?: Request): Promise<void> {
    // Validate authentication
    const personId = req?.person?.id;
    if (!personId) {
      throw new Error("User not authenticated");
    }

    // Verify ownership
    const existingPublication = await this.publication.findById(id);
    if (!existingPublication) {
      throw new Error("Publication not found");
    }

    if (existingPublication.personId !== personId) {
      throw new Error("Unauthorized: You can only delete your own publications");
    }

    await this.publication.delete(id);
  }
}
