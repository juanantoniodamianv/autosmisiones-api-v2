import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class VehicleVersionRepository extends BaseRepository<
  Prisma.VehicleVersionGetPayload<{}>
> {
  constructor() {
    super("vehicleVersion");
  }
}

export { VehicleVersionRepository };
