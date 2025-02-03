import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class StatusResourceRepository extends BaseRepository<
  Prisma.StatusGetPayload<{}>
> {
  constructor() {
    super("status");
  }
}

export { StatusResourceRepository };
