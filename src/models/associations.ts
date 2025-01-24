// src/models/associations.ts
import { City } from "./City";
import { Favorite } from "./Favorite";
import { Person } from "./Person";
import { PersonMediaResource } from "./PersonMediaResource";
import { Phone } from "./Phone";
import { Province } from "./Province";
import { Publication } from "./Publication";
import { PublicationMediaResource } from "./PublicationMediaResource";
import { Status } from "./Status";
import { VehicleCategory } from "./VehicleCategory";
import { VehicleCustomData } from "./VehicleCustomData";
import { VehicleMake } from "./VehicleMake";
import { VehicleModel } from "./VehicleModel";
import { VehicleVersion } from "./VehicleVersion";

// Relación belongsTo en City
City.belongsTo(Province, {
  foreignKey: "provinceId",
  as: "province",
});

// Relación hasMany en Province
Province.hasMany(City, {
  foreignKey: "provinceId",
  as: "cities",
});

Phone.belongsTo(Person, { foreignKey: "personId", as: "person" });

Person.hasMany(Phone, { foreignKey: "personId", as: "phones" });

// Relación hasMany con VehicleModel
VehicleMake.hasMany(VehicleModel, {
  foreignKey: "vehicleMakeId",
  as: "models",
});

VehicleModel.belongsTo(VehicleMake, {
  foreignKey: "vehicleMakeId",
  as: "vehicleMake",
});

// Relación hasMany con VehicleModel
VehicleCategory.hasMany(VehicleModel, {
  foreignKey: "vehicleCategoryId",
  as: "models",
});

VehicleModel.belongsTo(VehicleCategory, {
  foreignKey: "vehicleCategoryId",
  as: "vehicleCategory",
});

VehicleModel.hasMany(VehicleVersion, {
  foreignKey: "vehicleModelId",
  as: "versions",
});

// Relación belongsTo con VehicleModel
VehicleVersion.belongsTo(VehicleModel, {
  foreignKey: "vehicleModelId",
  as: "vehicleModel",
});

// Relación belongsTo con Publication
PublicationMediaResource.belongsTo(Publication, {
  foreignKey: "publicationId",
  as: "publication",
});

Publication.hasMany(PublicationMediaResource, {
  foreignKey: "publicationId",
  as: "publicationMediaResources",
});

// Relación belongsTo con Publication
VehicleCustomData.belongsTo(Publication, {
  foreignKey: "publicationId",
  as: "publication",
});

Publication.hasOne(VehicleCustomData, {
  foreignKey: "publicationId",
  as: "vehicleCustomData",
});

// Relaciones
Publication.belongsTo(Person, { foreignKey: "personId", as: "person" });
Publication.belongsTo(City, { foreignKey: "cityId", as: "city" });
Publication.belongsTo(Status, { foreignKey: "statusId", as: "status" });
Publication.belongsTo(VehicleVersion, {
  foreignKey: "vehicleVersionId",
  as: "vehicleVersion",
});
Publication.belongsTo(VehicleCategory, {
  foreignKey: "vehicleCategoryId",
  as: "vehicleCategory",
});

// Relaciones
Person.hasMany(Favorite, { foreignKey: "personId", as: "favorites" });
Person.hasMany(PersonMediaResource, {
  foreignKey: "personId",
  as: "personMediaResources",
});

// Relaciones
Favorite.belongsTo(Person, { foreignKey: "personId", as: "person" });
Favorite.belongsTo(Publication, {
  foreignKey: "publicationId",
  as: "publication",
});

// Relación belongsTo con Person
PersonMediaResource.belongsTo(Person, {
  foreignKey: "personId",
  as: "person",
});

export { City, Province };
