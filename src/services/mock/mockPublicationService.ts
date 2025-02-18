import { Publication } from "@prisma/client";

import { IPublicationService } from "../../controllers/PublicationController";

export class MockPublicationService implements IPublicationService {
  private publications: Publication[];

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
      vehicleVersionId: 3
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
      vehicleVersionId: 5
    },
  ];
}

  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
  }

  async findAll(where?: Partial<Publication>): Promise<Publication[]> {
      const filteredPublication = this.publications.filter((publication) => {
        return Object.entries(where || {}).every(
          ([key, value]) => publication[key as keyof Publication] === value
        );
      });
      return this.simulateDelay(filteredPublication);
    }
  
    async findById(id: number): Promise<Publication | null> {
      const publication = this.publications.find((p) => p.id === id);
      return this.simulateDelay(publication || null);
    }
  
    async create(data: Publication): Promise<Publication> {
      const publication= {
        ...data,
        id: this.publications.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.publications.push(publication);
      return this.simulateDelay(publication);
    }
  
    async update(id: number, data: Partial<Publication>): Promise<Publication | null> {
      const publicationIndex = this.publications.findIndex((p) => p.id === id);
      if (publicationIndex === -1) {
        return this.simulateDelay(null);
      }
  
      const updatedPublication = { ...this.publications[publicationIndex], ...data };
      this.publications[publicationIndex] = updatedPublication;
      return this.simulateDelay(updatedPublication);
    }
  
    async delete(id: number): Promise<void> {
      const personIndex = this.publications.findIndex((p) => p.id === id);
      if (personIndex === -1) {
        throw new Error("Person not found.");
      }
      this.publications.splice(personIndex, 1);
      return Promise.resolve();
    }
  
    async findOne(query: Partial<Publication>): Promise<Publication | null> {
      const person = this.publications.find((p) =>
        Object.entries(query).every(
          ([key, value]) => p[key as keyof Publication] === value
        )
      );
      return this.simulateDelay(person || null);
    }
}
