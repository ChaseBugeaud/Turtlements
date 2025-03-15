import "reflect-metadata"
import * as dotenv from "dotenv"
import { DataSource } from "typeorm"
import { Tournament } from "./entity/Tournament"
import { Contestant } from "./entity/Contestant"
import { Matchup } from "./entity/Matchup"
import { Score } from "./entity/Score"
import { Sponsor } from "./entity/Sponsor"


dotenv.config()

const pg_database: string = process.env["PG_DATABASE"]!
const pg_username: string = process.env["PG_USER"]!
const pg_password: string = process.env["PG_PASS"]!
const pg_host: string = process.env["PG_HOST"]!
const pg_port: string = process.env["PG_PORT"]!

export const AppDataSource = new DataSource({
    type: "postgres",
    host: pg_host,
    port: Number(pg_port),
    username: pg_username,
    password: pg_password,
    database: pg_database,
    synchronize: true,
    logging: false,
    entities: [Tournament, Contestant, Matchup, Sponsor, Score],
    migrations: [],
    subscribers: [],
})
