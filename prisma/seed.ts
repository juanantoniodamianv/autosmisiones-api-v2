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

  /*
   // 🚗 Crear publicaciones de ejemplo
  await prisma.publication.createMany({
    data: [
      {
        title: 'Toyota Corolla XEi 2020',
        description: 'Excelente estado, único dueño.',
        price: 12000000,
        previousPrice: 12500000,
        currencyType: 'ARS',
        condition: 'Usado',
        year: 2020,
        km: 45000,
        color: 'Blanco',
        neighborhood: 'Villa Sarita',
        transmission: 'Automática',
        engine: '1.8L',
        fuelType: 'Nafta',
        doors: '4',
        uniqueOwner: true,
        slugUrl: 'toyota-corolla-xei-2020',
        swap: false,
        marketDiscount: false,
        personId: person.id,
        cityId: city.id,
        statusId: status.id,
        vehicleCategoryId: categories[0].id,
        vehicleMakeId: makes[0].id,
        vehicleModelId: models[0].id,
        vehicleVersionId: versions[0].id,
      },
      {
        title: 'Ford Ranger Wildtrak 2021',
        description: 'Camioneta con pocos km, lista para trabajar.',
        price: 18000000,
        currencyType: 'ARS',
        condition: 'Usado',
        year: 2021,
        km: 32000,
        color: 'Gris',
        neighborhood: 'Centro',
        transmission: 'Manual',
        engine: '3.2L',
        fuelType: 'Diesel',
        doors: '4',
        uniqueOwner: false,
        slugUrl: 'ford-ranger-wildtrak-2021',
        swap: true,
        marketDiscount: true,
        personId: person.id,
        cityId: city.id,
        statusId: status.id,
        vehicleCategoryId: categories[2].id,
        vehicleMakeId: makes[1].id,
        vehicleModelId: models[3].id,
        vehicleVersionId: versions[4].id,
      },
      {
        title: 'Volkswagen Golf GTI 2019',
        description: 'Deportivo y cómodo, mantenimiento al día.',
        price: 15000000,
        currencyType: 'ARS',
        condition: 'Usado',
        year: 2019,
        km: 58000,
        color: 'Rojo',
        neighborhood: 'Itaembé Guazú',
        transmission: 'Automática',
        engine: '2.0L Turbo',
        fuelType: 'Nafta',
        doors: '5',
        uniqueOwner: true,
        slugUrl: 'vw-golf-gti-2019',
        swap: false,
        marketDiscount: false,
        personId: person.id,
        cityId: city.id,
        statusId: status.id,
        vehicleCategoryId: categories[0].id,
        vehicleMakeId: makes[2].id,
        vehicleModelId: models[4].id,
        vehicleVersionId: versions[5].id,
      },
      {
        title: 'Toyota RAV4 Limited 2022',
        description: 'SUV familiar full equipo.',
        price: 25000000,
        currencyType: 'ARS',
        condition: 'Nuevo',
        year: 2022,
        km: 5000,
        color: 'Negro',
        neighborhood: 'Villa Cabello',
        transmission: 'CVT',
        engine: '2.5L',
        fuelType: 'Híbrido',
        doors: '5',
        uniqueOwner: true,
        slugUrl: 'toyota-rav4-limited-2022',
        swap: false,
        marketDiscount: true,
        personId: person.id,
        cityId: city.id,
        statusId: status.id,
        vehicleCategoryId: categories[1].id,
        vehicleMakeId: makes[0].id,
        vehicleModelId: models[1].id,
        vehicleVersionId: versions[2].id,
      },
    ],
  });

  console.log('Seed data (vehicle + publication) created successfully.');
}
  */

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