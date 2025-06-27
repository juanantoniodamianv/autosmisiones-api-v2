import { prisma } from "./base";
import { PublicationWithRelations } from "../types/publication";

class PublicationRepository {
  async findAll(where?: any): Promise<PublicationWithRelations[]> {
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

  async findById(id: number): Promise<PublicationWithRelations | null> {
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

  async findBySlug(slugUrl: string): Promise<PublicationWithRelations | null> {
    return await prisma.publication.findUnique({
      where: { slugUrl },
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

  async findByPersonId(personId: number): Promise<PublicationWithRelations[]> {
    return await prisma.publication.findMany({
      where: { personId },
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

  async create(data: any): Promise<PublicationWithRelations> {
    const publication = await prisma.publication.create({
      data,
    });

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

  async update(id: number, data: any): Promise<PublicationWithRelations> {
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

  async delete(id: number): Promise<void> {
    await prisma.publication.delete({
      where: { id }
    });
  }

  async findOne(where?: any): Promise<PublicationWithRelations | null> {
    return await prisma.publication.findFirst({
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
}

export { PublicationRepository };
