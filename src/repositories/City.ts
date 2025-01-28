import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class CityRepository extends BaseRepository<Prisma.CityGetPayload<{}>> {
  constructor() {
    super("city");
  }
}

export { CityRepository };
