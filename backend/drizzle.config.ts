import dotenv from "dotenv"
import fs from "fs"
import { defineConfig } from 'drizzle-kit'
dotenv.config()

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.PG_HOST!,
        port: process.env.PG_PORT!,
        user: process.env.PG_USER!,
        password: process.env.PG_PASS!,
        database: process.env.PG_DATABASE!,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync("./ca-central-1-bundle.pem").toString()
        },
    },
})
