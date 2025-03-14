import Sequelize from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { pg_database, pg_username, pg_password, pg_host } from "./index.js";

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: pg_database,
    user: pg_username,
    password: pg_password,
    host: pg_host,
});
