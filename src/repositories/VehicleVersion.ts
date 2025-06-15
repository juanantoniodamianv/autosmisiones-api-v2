import { BaseRepository, prisma } from "./base";
import { Prisma } from "@prisma/client";

class VehicleVersionRepository extends BaseRepository<
  Prisma.VehicleVersionGetPayload<{
    include: {
      vehicleModel: true;
    };
  }>
> {
  constructor() {
    super("vehicleVersion");
  }

  async findAll(where?: any) {
    return await prisma.vehicleVersion.findMany({
      where,
      include: {
        vehicleModel: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.vehicleVersion.findUnique({
      where: { id },
      include: {
        vehicleModel: true,
      },
    });
  }
}

export { VehicleVersionRepository };
