import { IPublicationService } from "../controllers/PublicationController";
import { PublicationRepository } from "../repositories/Publication";
import { Request } from "express";
import { generatePublicationSlug } from "../utils/slugGenerator";
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

    // Validate required fields
    const requiredFields = ['title', 'condition', 'cityId', 'statusId'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Add personId from authenticated user
    data.personId = personId;

    // Generate slugUrl automatically if not provided
    if (!data.slugUrl) {
      let makeName: string | undefined;
      let modelName: string | undefined;
      let year: number | undefined;

      // If we have vehicle IDs, fetch the names
      if (data.vehicleMakeId) {
        const make = await prisma.vehicleMake.findUnique({
          where: { id: data.vehicleMakeId }
        });
        makeName = make?.name;
      }

      if (data.vehicleModelId) {
        const model = await prisma.vehicleModel.findUnique({
          where: { id: data.vehicleModelId }
        });
        modelName = model?.name;
      }

      year = data.year;

      data.slugUrl = await generatePublicationSlug(
        makeName,
        modelName,
        year,
        data.title
      );
    }

    return await this.publication.create(data);
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

    // If updating vehicle data or title, regenerate slug
    if (data.vehicleMakeId || data.vehicleModelId || data.year || data.title) {
      let makeName: string | undefined;
      let modelName: string | undefined;
      let year: number | undefined;

      // Use new data or fall back to current data
      if (data.vehicleMakeId) {
        const make = await prisma.vehicleMake.findUnique({
          where: { id: data.vehicleMakeId }
        });
        makeName = make?.name;
      } else {
        makeName = existingPublication.vehicleMake?.name;
      }

      if (data.vehicleModelId) {
        const model = await prisma.vehicleModel.findUnique({
          where: { id: data.vehicleModelId }
        });
        modelName = model?.name;
      } else {
        modelName = existingPublication.vehicleModel?.name;
      }

      year = data.year || existingPublication.year;

      data.slugUrl = await generatePublicationSlug(
        makeName,
        modelName,
        year,
        data.title || existingPublication.title
      );
    }

    return await this.publication.update(id, data);
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
