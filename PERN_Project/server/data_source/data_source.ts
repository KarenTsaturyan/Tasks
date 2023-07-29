import { DataSource } from "typeorm";
import { TutorialsEntity } from "../entities/tutorials.entity";
import "reflect-metadata"
import { UsersEntity } from "../entities/users.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,//sync with our db
    logging: ["query", "error"],
    entities: [TutorialsEntity, UsersEntity],
    // subscribers: [],
    // migrations: [],
})
