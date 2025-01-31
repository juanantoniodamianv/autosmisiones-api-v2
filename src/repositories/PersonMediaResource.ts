import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PersonMediaResourceRepository extends BaseRepository<
  Prisma.PersonMediaResourceGetPayload<{}>
> {
  constructor() {
    super("personMediaResource");
  }
}

export { PersonMediaResourceRepository };
