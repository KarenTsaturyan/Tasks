import { Request, Response, NextFunction } from "express";
import {activateUser, createUser, deleteUser, INewUser, retrieveUser, updateUser} from '../services/user-service'

export interface IReqBody {
    name:string
    age:number
    gender:string
}

//create
export async function createUserControl(req:Request, res:Response, next:NextFunction){//(req:Request, res:Response, next:NextFunction)
    const userPayload:IReqBody = req.body;
    const { name, age, gender } = req.body;
    if(name && age && gender ){
        return await createUser(userPayload)
         .then((user:INewUser) => res.status(201).json({
             message: `The post #${user.id} has been created`,
             content: user
         }))
         .catch(err => res.status(500).json({ message: err.message }))
    }else{
        res.status(400).json({ message: 'fields are not good' })
    }
}
//delete
export async function deleteUserControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id 

    if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
        res.status(400).json({ message: 'ID must be an integer' })
    }else{
        return await deleteUser(Number(reqId)).then((users) => res.status(201).json({
            message: `The post #${reqId} has been Deleted`,
            content: users
        }))
        .catch((err) => { 
            if (err.status) {
            res.status(err.status).json({ message: err.message })
        }else{
            res.status(500).json({ message: err.message })
        }
    })
    }

}
//get
export async function retrieveUserControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id
    if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
        res.status(400).json({ message: 'ID must be an integer' })
    }else{
        return await retrieveUser(Number(reqId)).then(user => res.json(user))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    }
}
//update
export async function updateUserControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id
    const userPayload:IReqBody = req.body;
    const { name, age, gender } = req.body;
    if (!Number.isInteger(Number(reqId))) {
        res.status(400).json({ message: 'ID must be an integer' })
    }else if(name && age && gender){
        return await updateUser(Number(reqId), userPayload)
        .then(user => res.json(user))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    }else{
        res.status(400).json({ message: 'fields are not good' })

    }
}
export async function activateUserControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id
    if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
        res.status(400).json({ message: 'ID must be an integer' })
    }else{
        return await activateUser(Number(reqId)).then(user => res.json(user))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    }
}
