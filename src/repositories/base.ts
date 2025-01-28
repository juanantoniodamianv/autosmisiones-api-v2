import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

abstract class BaseRepository<T extends { id: number }> {
  protected model: keyof PrismaClient;

  constructor(model: keyof PrismaClient) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    // @ts-ignore - Dynamically access the Prisma model
    return prisma[this.model].findMany();
  }

  async findById(id: number): Promise<T | null> {
    // @ts-ignore - Dynamically access the Prisma model
    return prisma[this.model].findUnique({
      where: { id },
    });
  }

  async create(data: Omit<T, "id">): Promise<T> {
    // @ts-ignore - Dynamically access the Prisma model
    return prisma[this.model].create({
      data,
    });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    // @ts-ignore - Dynamically access the Prisma model
    return prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<T> {
    // @ts-ignore - Dynamically access the Prisma model
    return prisma[this.model].delete({
      where: { id },
    });
  }
}

export { BaseRepository };
