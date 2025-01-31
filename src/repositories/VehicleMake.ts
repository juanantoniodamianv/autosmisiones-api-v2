import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class VehicleMakeRepository extends BaseRepository<
  Prisma.VehicleMakeGetPayload<{}>
> {
  constructor() {
    super("vehicleMake");
  }
}

export { VehicleMakeRepository };
