import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { UsersEntity } from "./users.entity"


@Entity({name:'tutorials'}) ///table name
export class TutorialsEntity {//strictpropertyinitialisation: false
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    title: string
    
    @Column({type: "varchar"})
    description: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @ManyToOne(type => UsersEntity, user => user.tutorials)
    user: UsersEntity; 
}