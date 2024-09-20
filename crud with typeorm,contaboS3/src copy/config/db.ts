import { DataSource } from "typeorm";
import { User } from "../entities/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "fw28_022",
  database: "cruds3",
  entities: [User],
  synchronize: true, // Auto sync DB schema (Turn off in production)
});
