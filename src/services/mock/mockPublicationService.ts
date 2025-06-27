import { Role } from "@prisma/client";
import { Request } from "express";

import { IPublicationService } from "../../controllers/PublicationController";
import { PublicationWithRelations } from "../../types/publication";

export class MockPublicationService implements IPublicationService {
  private publications: PublicationWithRelations[];

  constructor() {
    this.publications = [
    {
      id: 1,
      title: "Toyota Corolla 2020",
      description: "Excelente estado, único dueño, pocos km.",
      price: 15000,
      previousPrice: 16000,
      currencyType: "$",
      condition: "Usado",
      year: 2020,
      km: 30000,
      color: "Blanco",
      neighborhood: "Palermo",
      transmission: "Automática",
      engine: "1.8L",
      fuelType: "Nafta",
      doors: "4",
      uniqueOwner: true,
      slugUrl: "toyota-corolla-2020",
      swap: false,
      ownerPhone: "123-456-7890",
      marketDiscount: true,
      personId: 1,
      cityId: 1,
      statusId: 1,
      vehicleCategoryId: 1,
      vehicleModelId: 2,
      vehicleMakeId: 1,
      vehicleVersionId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      person: {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPublications: 3,
        openingHours: null,
        locationStreet: null,
        clerkId: "clerk_123"
      },
      city: {
        id: 1,
        name: "Buenos Aires",
        provinceId: 1
      },
      status: {
        id: 1,
        name: "Active"
      },
      vehicleCategory: {
        id: 1,
        name: "Sedan"
      },
      vehicleModel: {
        id: 2,
        name: "Corolla",
        vehicleMakeId: 1
      },
      vehicleMake: {
        id: 1,
        name: "Toyota",
        vehicleCategoryId: 1
      },
      vehicleVersion: {
        id: 3,
        name: "XEi",
        vehicleModelId: 2
      },
      publicationMediaResources: []
    } as PublicationWithRelations,
    {
      id: 2,
      title: "Honda Civic 2022",
      description: "Semi nuevo, garantía de fábrica.",
      price: 25000,
      previousPrice: 26000,
      currencyType: "$",
      condition: "Usado",
      year: 2022,
      km: 15000,
      color: "Negro",
      neighborhood: "Recoleta",
      transmission: "Automática",
      engine: "2.0L",
      fuelType: "Nafta",
      doors: "4",
      uniqueOwner: true,
      slugUrl: "honda-civic-2022",
      swap: false,
      ownerPhone: "987-654-3210",
      marketDiscount: false,
      personId: 2,
      cityId: 1,
      statusId: 1,
      vehicleCategoryId: 1,
      vehicleModelId: 4,
      vehicleMakeId: 2,
      vehicleVersionId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      person: {
        id: 2,
        name: "María García",
        email: "maria@example.com",
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPublications: 3,
        openingHours: null,
        locationStreet: null,
        clerkId: "clerk_456"
      },
      city: {
        id: 1,
        name: "Buenos Aires",
        provinceId: 1
      },
      status: {
        id: 1,
        name: "Active"
      },
      vehicleCategory: {
        id: 1,
        name: "Sedan"
      },
      vehicleModel: {
        id: 4,
        name: "Civic",
        vehicleMakeId: 2
      },
      vehicleMake: {
        id: 2,
        name: "Honda",
        vehicleCategoryId: 1
      },
      vehicleVersion: {
        id: 6,
        name: "EX",
        vehicleModelId: 4
      },
      publicationMediaResources: []
    } as PublicationWithRelations
    ];
  }

  private simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 100);
    });
  }

  async findAll(where?: any): Promise<PublicationWithRelations[]> {
      const filteredPublication = this.publications.filter((publication) => {
        return Object.entries(where || {}).every(
          ([key, value]) => publication[key as keyof PublicationWithRelations] === value
        );
      });
      return this.simulateDelay(filteredPublication);
    }

  async findById(id: number): Promise<PublicationWithRelations | null> {
    const publication = this.publications.find((p) => p.id === id);
    return this.simulateDelay(publication || null);
  }

  async findBySlug(slugUrl: string): Promise<PublicationWithRelations | null> {
    const publication = this.publications.find((p) => p.slugUrl === slugUrl);
    return this.simulateDelay(publication || null);
  }

  async findOne(query: any): Promise<PublicationWithRelations | null> {
    const publication = this.publications.find((p) =>
      Object.entries(query).every(
        ([key, value]) => p[key as keyof PublicationWithRelations] === value
      )
    );
    return this.simulateDelay(publication || null);
  }

  async create(data: any, req?: Request): Promise<PublicationWithRelations> {
    // Get personId from request or use default
    const personId = (req as any)?.person?.id || 1;
    
    const publication: PublicationWithRelations = {
      ...data,
      id: this.publications.length + 1,
      personId: personId,
      createdAt: new Date(),
      updatedAt: new Date(),
      person: {
        id: personId,
        name: "Mock Person",
        email: "mock@example.com",
        role: Role.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
        maxPublications: 3,
        openingHours: null,
        locationStreet: null,
        clerkId: "clerk_mock"
      },
      city: {
        id: data.cityId,
        name: "Mock City",
        provinceId: 1
      },
      status: {
        id: data.statusId,
        name: "Active"
      },
      vehicleCategory: data.vehicleCategoryId ? {
        id: data.vehicleCategoryId,
        name: "Mock Category"
      } : null,
      vehicleModel: data.vehicleModelId ? {
        id: data.vehicleModelId,
        name: "Mock Model",
        vehicleMakeId: data.vehicleMakeId || 1
      } : null,
      vehicleMake: data.vehicleMakeId ? {
        id: data.vehicleMakeId,
        name: "Mock Make",
        vehicleCategoryId: data.vehicleCategoryId || 1
      } : null,
      vehicleVersion: data.vehicleVersionId ? {
        id: data.vehicleVersionId,
        name: "Mock Version",
        vehicleModelId: data.vehicleModelId || 1
      } : null,
      publicationMediaResources: []
    };
    this.publications.push(publication);
    return this.simulateDelay(publication);
  }

  async update(id: number, data: any, req?: Request): Promise<PublicationWithRelations | null> {
    const publicationIndex = this.publications.findIndex((p) => p.id === id);
    if (publicationIndex === -1) {
      return null;
    }

    // Check ownership if personId is provided
    if ((req as any)?.person?.id) {
      const publication = this.publications[publicationIndex];
      if (publication.personId !== (req as any).person.id) {
        throw new Error("Unauthorized: You can only update your own publications");
      }
    }

    this.publications[publicationIndex] = {
      ...this.publications[publicationIndex],
      ...data,
      updatedAt: new Date(),
    };
    return this.simulateDelay(this.publications[publicationIndex]);
  }

  async delete(id: number, req?: Request): Promise<void> {
    const publicationIndex = this.publications.findIndex((p) => p.id === id);
    if (publicationIndex === -1) {
      throw new Error("Publication not found.");
    }

    // Check ownership if personId is provided
    if ((req as any)?.person?.id) {
      const publication = this.publications[publicationIndex];
      if (publication.personId !== (req as any).person.id) {
        throw new Error("Unauthorized: You can only delete your own publications");
      }
    }

    this.publications.splice(publicationIndex, 1);
    return Promise.resolve();
  }
}
