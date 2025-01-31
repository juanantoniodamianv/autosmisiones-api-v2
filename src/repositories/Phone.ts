import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PhoneRepository extends BaseRepository<Prisma.PhoneGetPayload<{}>> {
  constructor() {
    super("phone");
  }
}

export { PhoneRepository };
