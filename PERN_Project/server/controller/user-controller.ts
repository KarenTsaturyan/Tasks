import { Request, Response, NextFunction } from "express";
import { IReqBodyUser, addUser, retrieveUsers } from "../services/user-service";
import { INewUser } from "../services/tutorial-service";


export async function addUserControl(req:Request, res:Response, next:NextFunction){//(req:Request, res:Response, next:NextFunction)
    const userPayload:IReqBodyUser = req.body;
    const { name, surname } = userPayload;//title, description
    if(name && surname){
        return await addUser(userPayload)
         .then((user:number) => res.status(201).json({
             message: `The post #${user} has been created`,
         }))
         .catch(err => res.status(500).json({ message: err.message }))
    }else{
        res.status(400).json({ message: 'fields are not good' })
    }
}

export async function retrieveUsersControl(req:Request, res:Response, next:NextFunction) {
    // const reqId:string|number = req.params.id
    // if (!Number.isInteger(Number(reqId))) {
    //     res.status(400).json({ message: 'ID must be an integer' })
    // }else{
    return await retrieveUsers().then(users => res.json(users))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
}
// }