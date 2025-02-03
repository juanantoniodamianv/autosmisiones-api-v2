import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

abstract class BaseRepository<T extends { id: number }> {
  protected model: keyof PrismaClient;

  constructor(model: keyof PrismaClient) {
    this.model = model;
  }

  async findAll(where?: {}): Promise<T[]> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].findMany({ where });
  }

  async findOne(where?: {}): Promise<T> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].findUnique({ where });
  }

  async findById(id: number): Promise<T | null> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].findUnique({
      where: { id },
    });
  }

  async create(data: Omit<T, "id">): Promise<T> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].create({
      data,
    });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<T> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].delete({
      where: { id },
    });
  }

  async upsert(
    where: {},
    updateData: Partial<T>,
    createData: Omit<T, "id">
  ): Promise<T> {
    // @ts-expect-error - Dynamically access the Prisma model
    return prisma[this.model].upsert({
      where,
      update: updateData,
      create: createData,
    });
  }
}

export { BaseRepository };
