// src/models/associations.ts
import { City } from "./City";
import { Province } from "./Province";

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

export { City, Province };
