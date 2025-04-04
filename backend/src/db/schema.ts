import { relations } from "drizzle-orm"
import { integer, pgTable, varchar, date, text, uuid } from "drizzle-orm/pg-core"

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
    id: uuid().unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    logo: varchar({ length: 255 }),
    seed: integer().notNull(),
    tournament_id: integer().notNull().references(() => tournaments.id)
})

export const contestantsRelations = relations(contestants, ({ one, many }) => ({
    tournament: one(tournaments, {
        fields: [contestants.tournament_id],
        references: [tournaments.id]
    }),
    matchups: many(matchups)
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
    tournament: one(tournaments, {
        fields: [sponsors.tournament_id],
        references: [tournaments.id]
    })
}))

export const matchups = pgTable("matchup", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tournament_id: integer().notNull().references(() => tournaments.id),
    contestant1_id: uuid().references(() => contestants.id),
    contestant2_id: uuid().references(() => contestants.id)
})

export const matchupsRelations = relations(matchups, ({ one }) => ({
    contestant1: one(contestants),
    contestant2: one(contestants),
}))

export const admins = pgTable("admin", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 40 }).notNull(),
    password: text().notNull()
})
