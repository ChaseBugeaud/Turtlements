import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from "typeorm"
import { Tournament } from "./Tournament"
import { Score } from "./Score"

@Entity()
export class Contestant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    logo: string

    @Column()
    seed: number

    @ManyToOne(() => Tournament, (tournament) => tournament.contestants)
    tournament: Tournament

    @OneToMany(() => Score, (score) => score.contestant)
    scores: Score[]

}
