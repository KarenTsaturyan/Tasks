import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { TutorialsEntity } from "./tutorials.entity"


@Entity({name:'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name: string
    
    @Column({type: "varchar"})
    surname: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @OneToMany(type => TutorialsEntity, tutorial => tutorial.user, {
        cascade: true
    }) 
    tutorials: TutorialsEntity[];

    // addTutorial(tutorial:TutorialsEntity ){
    //     if(this.tutorials === null){
    //         this.tutorials = new Array<TutorialsEntity>();
    //     }
    //     this.tutorials.push(tutorial)
    // }
}