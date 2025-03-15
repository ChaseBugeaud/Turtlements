import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm"
import { Tournament } from "./Tournament"
import { Score } from "./Score"

@Entity()
export class Matchup extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Score, (score) => score.matchup)
    score: Score[]

    @ManyToOne(() => Tournament, (tournament) => tournament.matchups)
    tournament: Tournament

}
