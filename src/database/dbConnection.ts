import "reflect-metadata";
import { DataSource } from "typeorm";
require('dotenv').config();

// When running compiled production code (`node dist/`), __filename ends in .js
// and entities live in dist/. In dev (ts-node-dev) they are .ts files under src/.
const isCompiled = __filename.endsWith(".js");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: isCompiled
    ? ["dist/context/**/entity/*.entity.js"]
    : ["src/context/**/entity/*.entity.ts"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
