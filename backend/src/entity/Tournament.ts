import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, OneToOne } from "typeorm"
import { Contestant } from "./Contestant"
import { Sponsor } from "./Sponsor"
import { Matchup } from "./Matchup"

@Entity()
export class Tournament extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column()
    prize: string

    @OneToMany(() => Contestant, (contestant) => contestant.tournament)
    contestants: Contestant[]

    @OneToMany(() => Matchup, (matchup) => matchup.tournament)
    matchups: Matchup[]

    @OneToOne(() => Sponsor, (sponsor) => sponsor.tournament)
    sponsor: Sponsor

}
