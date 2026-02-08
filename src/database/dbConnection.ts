import "reflect-metadata";
import { DataSource } from "typeorm";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: ["src/context/**/entity/*.entity.ts"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
