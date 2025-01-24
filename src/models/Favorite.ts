// src/models/Favorite.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Person } from "./Person";
import { Publication } from "./Publication";

class Favorite extends Model {
  public id!: number;

  // Relaciones
  public readonly person?: Person;
  public readonly publication?: Publication;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Favorite",
    tableName: "favorites",
  }
);

// Relaciones
Favorite.belongsTo(Person, { foreignKey: "personId", as: "person" });
Favorite.belongsTo(Publication, {
  foreignKey: "publicationId",
  as: "publication",
});

export { Favorite };
