import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class PublicationMediaResourceRepository extends BaseRepository<
  Prisma.PublicationMediaResourceGetPayload<{}>
> {
  constructor() {
    super("publicationMediaResource");
  }
}

export { PublicationMediaResourceRepository };
