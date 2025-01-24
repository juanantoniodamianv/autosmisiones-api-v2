import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "autosmisiones-api-v2",
  "postgres",
  "348260830",
  {
    host: "localhost",
    dialect: "postgres", // o "mysql", "sqlite", "mssql"
  }
);

export { sequelize };
