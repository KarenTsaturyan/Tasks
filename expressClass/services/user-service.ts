import users from '../data/users.json'
import {getNewId, checkElInArr, writeJSONFile} from '../helper/helper'
import { IReqBody } from '../controller/user-controller'
export interface INewUser {
    id:number
    name:string
    age:number
    gender:string
    createdAt:string
    updatedAt:string,
    status:boolean
}
//CreateUser
export function createUser(payload: IReqBody){
    return new Promise<INewUser>((resolve, reject) => {
        const id = { id: getNewId(users) }
        const date = { 
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        } 
        const status ={status:false}
        const newUser:INewUser = { ...id, ...payload, ...date, ...status }
        users.push(newUser)
        // fs.writeFile("../data/users.json", users)
        writeJSONFile("./data/users.json", users)
        resolve(newUser)
    })
}
//Delete User
export function deleteUser(id:number) {
    return new Promise((resolve, reject) => {
        checkElInArr(users, id)
        .then(() => {
            const filteredUsers:INewUser[] = users.filter(user => user.id !== id)
            writeJSONFile("./data/users.json", filteredUsers)//update
            resolve(filteredUsers)
        })
        .catch(err => reject(err))
    })
}
export function retrieveUser(id:number) {
    return new Promise((resolve, reject) => {
        checkElInArr(users, id)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}
//Update User
export function updateUser(id:number, newUser:IReqBody) {
    return new Promise((resolve, reject) => {
        checkElInArr(users, id)
        .then((user) => {
            const index = users.findIndex(el => el.id == user?.id)
            // const id = { id: user?.id }
            const date = {
                createdAt: users[index].createdAt,
                updatedAt: new Date().toString()
            } 
            const status ={status:false}
            users[index] = { id, ...newUser, ...date, ...status,  }
            writeJSONFile("./data/users.json", users)
            resolve(users[index])
        })
        .catch(err => reject(err))
    })
}
//Change status to True
export function activateUser(id:number) {
    return new Promise((resolve, reject) => {
        checkElInArr(users, id)
        .then((user) =>{
            const index = users.findIndex(el => el.id == user?.id)
            const status ={status:!(users[index].status)}
            users[index] = {...users[index], ...status }
            writeJSONFile("./data/users.json", users)
            resolve(users[index])
        })
        .catch(err => reject(err))
    })
}
