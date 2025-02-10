import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PersonRepository extends BaseRepository<
  Prisma.PersonGetPayload<{
    include: { accounts: true; personMediaResources: true };
  }>
> {
  constructor() {
    super("person");
  }
}

export { PersonRepository };
