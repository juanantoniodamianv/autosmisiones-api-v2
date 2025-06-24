import { BaseRepository, prisma } from "./base";
import { Prisma } from "@prisma/client";

class PublicationRepository extends BaseRepository<
  Prisma.PublicationGetPayload<{
    include: {
      person: true;
      city: true;
      status: true;
      vehicleCategory: true;
      vehicleModel: true;
      vehicleMake: true;
      vehicleVersion: true;
      publicationMediaResources: true;
    };
  }>
> {
  constructor() {
    super("publication");
  }

  async findAll(where?: any) {
    return await prisma.publication.findMany({
      where,
      include: {
        person: true,
        city: true,
        status: true,
        vehicleCategory: true,
        vehicleModel: true,
        vehicleMake: true,
        vehicleVersion: true,
        publicationMediaResources: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.publication.findUnique({
      where: { id },
      include: {
        person: true,
        city: true,
        status: true,
        vehicleCategory: true,
        vehicleModel: true,
        vehicleMake: true,
        vehicleVersion: true,
        publicationMediaResources: true,
      },
    });
  }

  async create(data: any) {
    // Validate required fields
    const requiredFields = ['title', 'condition', 'slugUrl', 'personId', 'cityId', 'statusId'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // First create the publication without relations
    const publication = await prisma.publication.create({
      data,
    });

    // Then fetch it with relations
    const publicationWithRelations = await prisma.publication.findUnique({
      where: { id: publication.id },
      include: {
        person: true,
        city: true,
        status: true,
        vehicleCategory: true,
        vehicleModel: true,
        vehicleMake: true,
        vehicleVersion: true,
        publicationMediaResources: true,
      },
    });

    if (!publicationWithRelations) {
      throw new Error("Failed to create publication with relations");
    }

    return publicationWithRelations;
  }

  async update(id: number, data: any) {
    return await prisma.publication.update({
      where: { id },
      data,
      include: {
        person: true,
        city: true,
        status: true,
        vehicleCategory: true,
        vehicleModel: true,
        vehicleMake: true,
        vehicleVersion: true,
        publicationMediaResources: true,
      },
    });
  }
}

export { PublicationRepository };
