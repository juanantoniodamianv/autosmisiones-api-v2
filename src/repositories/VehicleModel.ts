import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class VehicleModelRepository extends BaseRepository<
  Prisma.VehicleModelGetPayload<{}>
> {
  constructor() {
    super("vehicleModel");
  }
}

export { VehicleModelRepository };
