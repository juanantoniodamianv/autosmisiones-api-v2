import { Prisma } from "@prisma/client";

export type PublicationWithRelations = Prisma.PublicationGetPayload<{
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
}>;

// You can also add other publication-related types here
export type CreatePublicationData = Omit<PublicationWithRelations, 'id' | 'createdAt' | 'updatedAt' | 'person' | 'city' | 'status' | 'vehicleCategory' | 'vehicleModel' | 'vehicleMake' | 'vehicleVersion' | 'publicationMediaResources'>;

export type UpdatePublicationData = Partial<CreatePublicationData>; 