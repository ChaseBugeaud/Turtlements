import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Matchup } from "./Matchup"
import { Contestant } from "./Contestant"

@Entity()
export class Score extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    score: number

    @ManyToOne(() => Matchup, (matchup) => matchup.score)
    matchup: Matchup

    @ManyToOne(() => Contestant, (contestant) => contestant.score)
    contestant: Contestant

}
