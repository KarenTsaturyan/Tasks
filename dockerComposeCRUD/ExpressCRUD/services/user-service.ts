import users from '../data/users.json'
import {getNewId, checkElInArr, writeJSONFile} from '../helper/helper'
import { IReqBody } from '../controller/user-controller'
import { UsersEntity } from '../entities/users.entity'
import { AppDataSource } from '../data_source/data_source'
export interface INewUser {
    id:number
    name:string
    age:number
    gender:string
    status:boolean
}

const usersRepository=AppDataSource.getRepository(UsersEntity)
//CreateUser
export function createUser(payload: IReqBody){
    return new Promise<INewUser>((resolve, reject) => {
        try {
            const user = usersRepository.create({...payload})
            const results = usersRepository.save(user)
            resolve(results)
        } catch (e) {
            reject(e)
        }
    })
}
//Delete User
export function deleteUser(id:number) {
    return new Promise((resolve, reject) => {

        //     usersRepository
        //     .createQueryBuilder('users')
        //     .delete()
        //     .from(UsersEntity)
        //     .where("id = :id", { id: id })
        //     .execute()

        const user = usersRepository.delete(id)
        user.then((el)=>{
            if(el.affected){
                resolve("User has been deleted")
            }else{
                reject({message:"User's not found"})
            }
        }).catch(err=>{
            reject(err)
        })
    })
}
export function retrieveUser(id:number) {
    return new Promise((resolve, reject) => {
        const user = usersRepository.findOneBy({
            id:id
        })
        user
        .then((el)=>{
            if(!!el?.id){
                resolve(el)
            }else{
                reject({message:"User's not found"})
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}
//Update User
export function updateUser(id:number, newUser:IReqBody) {
    return new Promise((resolve, reject) => {
        const user = usersRepository.findOneBy({
            id: id,
        })
        user
        .then(el=>{
            if(el?.id){
                el.name = newUser.name
                el.age = newUser.age
                el.gender = newUser.gender
                const results = usersRepository.save(el)
                resolve(results)
            }else{
                    reject({message:"User's not found"})
            }
        })
        .catch(err=>{
            reject(err.message) 
        })
    })
}
//Change status to True
export function activateUser(id:number) {
    return new Promise((resolve, reject) => {
        // usersRepository.update({
        //     id: id,
        // },{
        //     status: !status,//chi ashxatum
        // });
        const user = usersRepository.findOneBy({
            id: id,
        })
        user
        .then(el=>{
            if(!!el?.id){
                el.status = !el.status
                const results = usersRepository.save(el)
                resolve(results)
            }else{
                reject({message:"User's not found"})
            }

        })
        .catch(err=>{
            reject(err.message) 
        })
    })
}
