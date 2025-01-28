import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PersonRepository extends BaseRepository<Prisma.PersonGetPayload<{}>> {
  constructor() {
    super("person");
  }
}

export { PersonRepository };
