import { Role } from "@prisma/client";

import { IPublicationService } from "../../controllers/PublicationController";

type PublicationWithRelations = {
  id: number;
  title: string;
  description: string | null;
  price: number | null;
  previousPrice: number | null;
  currencyType: string;
  condition: string;
  year: number | null;
  km: number | null;
  color: string | null;
  neighborhood: string | null;
  transmission: string | null;
  engine: string | null;
  fuelType: string | null;
  doors: string | null;
  uniqueOwner: boolean;
  slugUrl: string;
  swap: boolean;
  ownerPhone: string | null;
  marketDiscount: boolean;
  personId: number;
  cityId: number;
  statusId: number;
  vehicleCategoryId: number | null;
  vehicleModelId: number | null;
  vehicleMakeId: number | null;
  vehicleVersionId: number | null;
  createdAt: Date;
  updatedAt: Date;
  person: {
    id: number;
    name: string | null;
    email: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    maxPublications: number;
    openingHours: string | null;
    locationStreet: string | null;
    clerkId: string;
  };
  city: {
    id: number;
    name: string;
    provinceId: number;
  };
  status: {
    id: number;
    name: string;
  };
  vehicleCategory: {
    id: number;
    name: string;
  } | null;
  vehicleModel: {
    id: number;
    name: string;
    vehicleMakeId: number;
  } | null;
  vehicleMake: {
    id: number;
    name: string;
    vehicleCategoryId: number;
  } | null;
  vehicleVersion: {
    id: number;
    name: string;
    vehicleModelId: number;
  } | null;
  publicationMediaResources: Array<{
    id: number;
    url: string;
    publicationId: number;
  }>;
};

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
    },
    {
      id: 2,
      title: "Ford Ranger 2022",
      description: "Nueva, sin rodar, motor diésel.",
      price: 35000,
      previousPrice: 16000,
      currencyType: "$",
      condition: "Nuevo",
      year: 2022,
      km: 0,
      color: "Azul",
      neighborhood: "Recoleta",
      transmission: "Manual",
      engine: "3.2L",
      fuelType: "Diésel",
      doors: "4",
      uniqueOwner: false,
      slugUrl: "ford-ranger-2022",
      swap: false,
      ownerPhone: "987-654-3210",
      marketDiscount: false,
      personId: 2,
      cityId: 2,
      statusId: 1,
      vehicleCategoryId: 2,
      vehicleModelId: 4,
      vehicleMakeId: 2,
      vehicleVersionId: 5,
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
        id: 2,
        name: "Córdoba",
        provinceId: 2
      },
      status: {
        id: 1,
        name: "Active"
      },
      vehicleCategory: {
        id: 2,
        name: "Pickup"
      },
      vehicleModel: {
        id: 4,
        name: "Ranger",
        vehicleMakeId: 2
      },
      vehicleMake: {
        id: 2,
        name: "Ford",
        vehicleCategoryId: 2
      },
      vehicleVersion: {
        id: 5,
        name: "Wildtrak",
        vehicleModelId: 4
      },
      publicationMediaResources: []
    },
  ];
}

  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
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
  
    async create(data: any): Promise<PublicationWithRelations> {
      const publication: PublicationWithRelations = {
        ...data,
        id: this.publications.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        person: {
          id: data.personId,
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
  
    async update(id: number, data: any): Promise<PublicationWithRelations | null> {
      const publicationIndex = this.publications.findIndex((p) => p.id === id);
      if (publicationIndex === -1) {
        return this.simulateDelay(null);
      }
  
      const updatedPublication = { ...this.publications[publicationIndex], ...data };
      this.publications[publicationIndex] = updatedPublication;
      return this.simulateDelay(updatedPublication);
    }
  
    async delete(id: number): Promise<void> {
      const publicationIndex = this.publications.findIndex((p) => p.id === id);
      if (publicationIndex === -1) {
        throw new Error("Publication not found.");
      }
      this.publications.splice(publicationIndex, 1);
      return Promise.resolve();
    }
  
    async findOne(query: any): Promise<PublicationWithRelations | null> {
      const publication = this.publications.find((p) =>
        Object.entries(query).every(
          ([key, value]) => p[key as keyof PublicationWithRelations] === value
        )
      );
      return this.simulateDelay(publication || null);
    }
}
