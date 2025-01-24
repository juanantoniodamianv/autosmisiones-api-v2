// src/models/PublicationMediaResource.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Publication } from "./Publication";

class PublicationMediaResource extends Model {
  public id!: number;
  public url!: string;

  // Relaciones
  public readonly publication?: Publication;
}

PublicationMediaResource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PublicationMediaResource",
    tableName: "publicationMediaResources",
  }
);

export { PublicationMediaResource };
