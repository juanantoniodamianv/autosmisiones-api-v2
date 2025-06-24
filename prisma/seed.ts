import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Vehicle Categories
  const categories = await Promise.all([
    prisma.vehicleCategory.create({
      data: {
        name: 'Sedan',
      },
    }),
    prisma.vehicleCategory.create({
      data: {
        name: 'SUV',
      },
    }),
    prisma.vehicleCategory.create({
      data: {
        name: 'Pickup',
      },
    }),
  ]);

  // Create Vehicle Makes with their categories
  const makes = await Promise.all([
    prisma.vehicleMake.create({
      data: {
        name: 'Toyota',
        vehicleCategoryId: categories[0].id,
      },
    }),
    prisma.vehicleMake.create({
      data: {
        name: 'Ford',
        vehicleCategoryId: categories[0].id,
      },
    }),
    prisma.vehicleMake.create({
      data: {
        name: 'Volkswagen',
        vehicleCategoryId: categories[0].id,
      },
    }),
  ]);

  // Create Vehicle Models
  const models = await Promise.all([
    // Toyota Models
    prisma.vehicleModel.create({
      data: {
        name: 'Corolla',
        vehicleMakeId: makes[0].id,
      },
    }),
    prisma.vehicleModel.create({
      data: {
        name: 'RAV4',
        vehicleMakeId: makes[0].id,
      },
    }),
    // Ford Models
    prisma.vehicleModel.create({
      data: {
        name: 'Focus',
        vehicleMakeId: makes[1].id,
      },
    }),
    prisma.vehicleModel.create({
      data: {
        name: 'Ranger',
        vehicleMakeId: makes[1].id,
      },
    }),
    // Volkswagen Models
    prisma.vehicleModel.create({
      data: {
        name: 'Golf',
        vehicleMakeId: makes[2].id,
      },
    }),
    prisma.vehicleModel.create({
      data: {
        name: 'Tiguan',
        vehicleMakeId: makes[2].id,
      },
    }),
  ]);

  // Create Vehicle Versions
  await Promise.all([
    // Toyota Corolla Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'XEi',
        vehicleModelId: models[0].id,
      },
    }),
    prisma.vehicleVersion.create({
      data: {
        name: 'XLi',
        vehicleModelId: models[0].id,
      },
    }),
    // Toyota RAV4 Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'Limited',
        vehicleModelId: models[1].id,
      },
    }),
    // Ford Focus Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'SE',
        vehicleModelId: models[2].id,
      },
    }),
    // Ford Ranger Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'Wildtrak',
        vehicleModelId: models[3].id,
      },
    }),
    // Volkswagen Golf Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'GTI',
        vehicleModelId: models[4].id,
      },
    }),
    // Volkswagen Tiguan Versions
    prisma.vehicleVersion.create({
      data: {
        name: 'R-Line',
        vehicleModelId: models[5].id,
      },
    }),
  ]);

  // Create Provinces
  const provinces = await Promise.all([
    prisma.province.create({
      data: {
        name: 'Buenos Aires',
      },
    }),
  ]);

  // Create Cities
  const cities = await Promise.all([
    prisma.city.create({
      data: {
        name: 'Buenos Aires',
        provinceId: provinces[0].id,
      },
    }),
  ]);

  // Create Statuses
  const statuses = await Promise.all([
    prisma.status.create({
      data: {
        name: 'Active',
      },
    }),
    prisma.status.create({
      data: {
        name: 'Inactive',
      },
    }),
    
    prisma.status.create({
      data: {
        name: 'Sold',
      },
    }),

    prisma.status.create({
      data: {
        name: 'Pending',
      },
    }),
  ]);

  await Promise.all([
    provinces, cities, statuses
  ]);

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 