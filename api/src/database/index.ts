import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config";

const dataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  username: config.dbUser,
  password: config.dbPassword,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  // This is necessary because typeOrm tries to use the entity constructor without params
  entitySkipConstructor: true,
});

dataSource
  .initialize()
  .then(() => console.info("Connection to database succeed"))
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

export { dataSource };
