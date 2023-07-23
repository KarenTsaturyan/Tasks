import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity({name:'users'}) ///table name
export class UsersEntity {//strictpropertyinitialisation: false
    @PrimaryGeneratedColumn()
    id: number

    
    @Column({type: "varchar"})
    name: string
    
    @Column()// ({select:false})
    age: number
    
    @Column({type: "varchar"})
    gender: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @Column({default: false})
    status:boolean
}