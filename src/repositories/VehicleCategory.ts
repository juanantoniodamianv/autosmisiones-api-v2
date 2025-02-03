import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class VehicleCategoryRepository extends BaseRepository<
  Prisma.VehicleCategoryGetPayload<{}>
> {
  constructor() {
    super("vehicleCategory");
  }
}

export { VehicleCategoryRepository };
