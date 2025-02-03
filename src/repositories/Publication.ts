import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PublicationRepository extends BaseRepository<
  Prisma.PublicationGetPayload<{}>
> {
  constructor() {
    super("publication");
  }
}

export { PublicationRepository };
