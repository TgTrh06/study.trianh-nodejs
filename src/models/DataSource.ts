import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "./entities/User.entity";
import { Role } from "./entities/Role.entity";
import { Book } from "./entities/Book.entity";
import { Author } from "./entities/Author.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User, Role, Book, Author],

  synchronize: true, // ❗ chỉ dùng DEV -> Tự tạo bảng
  // synchronize: false,
  logging: false,
});
