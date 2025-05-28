import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";
import { prisma } from "./base";

class PersonRepository extends BaseRepository<
  Prisma.PersonGetPayload<{
    include: { accounts: true; personMediaResources: true };
  }>
> {
  constructor() {
    super("person");
  }

  async findUnique(query: { where: { clerkId: string } }): Promise<any | null> {
    return await prisma.person.findUnique({
      where: { clerkId: query.where.clerkId }
    });
  }
}

export { PersonRepository };
