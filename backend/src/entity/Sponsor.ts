import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { Tournament } from "./Tournament"

@Entity()
export class Sponsor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    thumbnail: string

    @Column()
    header_image: string

    @Column()
    description: string

    @OneToOne(() => Tournament)
    @JoinColumn()
    tournament: Tournament

}
