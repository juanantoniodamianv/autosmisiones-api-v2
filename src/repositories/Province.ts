import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class ProvinceRepository extends BaseRepository<Prisma.ProvinceGetPayload<{}>> {
  constructor() {
    super("province");
  }
}

export { ProvinceRepository };
