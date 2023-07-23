import { DataSource } from "typeorm";
import { UsersEntity } from "../entities/users.entity";
import "reflect-metadata"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,//sync with our db
    logging: ["query", "error"],
    entities: [UsersEntity],
    // subscribers: [],
    // migrations: [],
})
