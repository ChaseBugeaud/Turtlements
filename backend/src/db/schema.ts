import { relations } from "drizzle-orm"
import { integer, pgTable, varchar, date, text } from "drizzle-orm/pg-core"

export const tournaments = pgTable("tournament", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
    description: varchar({ length: 255 }),
    start_date: date().notNull(),
    end_date: date().notNull(),
    prize: varchar({ length: 255 }).notNull(),
})

export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
    sponsor: one(sponsors),
    contestants: many(contestants),
    matchups: many(matchups)
}))

export const contestants = pgTable("contestant", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    logo: varchar({ length: 255 }),
    seed: integer().notNull(),
    tournament_id: integer().notNull().references(() => tournaments.id)
})

export const contestantsRelations = relations(contestants, ({ many }) => ({
    scores: many(scores)
}))

export const sponsors = pgTable("sponsor", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    thumbnail: varchar({ length: 255 }),
    header_image: varchar({ length: 255 }),
    description: varchar({ length: 255 }),
    tournament_id: integer().notNull().references(() => tournaments.id)
})

export const sponsorsRelations = relations(sponsors, ({ one }) => ({
    tournament: one(tournaments)
}))

export const matchups = pgTable("matchup", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tournament_id: integer().notNull().references(() => tournaments.id)
})

export const matchupsRelations = relations(matchups, ({ many }) => ({
    scores: many(scores)
}))

export const scores = pgTable("score", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    score: integer().notNull(),
    matchup_id: integer().notNull().references(() => matchups.id),
    contestant_id: integer().notNull().references(() => contestants.id)
})

export const admins = pgTable("admin", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 40 }).notNull(),
    password: text().notNull()
})
