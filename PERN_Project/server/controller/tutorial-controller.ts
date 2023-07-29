import { Request, Response, NextFunction } from "express";
import {addTutorial, deleteTutorial, INewUser, retrieveTutorial, retrieveTutorials, updateTutorial} from '../services/tutorial-service'

export interface IReqBody {
    title:string
    description:string
}

//create
export async function addTutorialControl(req:Request, res:Response, next:NextFunction){//(req:Request, res:Response, next:NextFunction)
    const tutorialPayload:IReqBody = req.body;
    const reqId:string|number = req.params.id
    const { title, description } = req.body;//title, description
    if (!Number.isInteger(Number(reqId))) {
            res.status(400).json({ message: 'ID must be an integer' })
    }else{
        if(title && description){
            return await addTutorial(tutorialPayload, Number(reqId))
            .then((tutorial:INewUser) => res.status(201).json({
                message: `The post #${tutorial.id} has been created`,
                content: tutorial
            }))
            .catch(err => res.status(500).json({ message: err.message }))
        }else{
            res.status(400).json({ message: 'fields are not good' })
        }
    }
}
//delete
export async function deleteTutorialControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id 

    if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
        res.status(400).json({ message: 'ID must be an integer' })
    }else{
        return await deleteTutorial(Number(reqId)).then((tutorials) => res.status(201).json({
            message: `The post #${reqId} has been Deleted`,
            content: tutorials
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
export async function retrieveTutorialControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id
    if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
        res.status(400).json({ message: 'ID must be an integer' })
    }else{
        return await retrieveTutorial(Number(reqId)).then(tutorial => res.json(tutorial))
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
export async function updateTutorialControl(req:Request, res:Response, next:NextFunction) {
    const reqId:string|number = req.params.id
    const tutorialPayload:IReqBody = req.body;
    const { title, description } = req.body;
    if (!Number.isInteger(Number(reqId))) {
        res.status(400).json({ message: 'ID must be an integer' })
    }else if(title && description){
        return await updateTutorial(Number(reqId), tutorialPayload)
        .then(tutorial => res.json(tutorial))
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

export async function retrieveTutorialsControl(req:Request, res:Response, next:NextFunction) {
        const reqId:string|number = req.params.id
        if (!Number.isInteger(Number(reqId))) {
            res.status(400).json({ message: 'ID must be an integer' })
        }else{
        return await retrieveTutorials(Number(reqId)).then(tutorial => res.json(tutorial))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    }
    }
// export async function editTutorialControl(req:Request, res:Response, next:NextFunction) {
//     const reqId:string|number = req.params.id
//     if (!Number.isInteger(Number(reqId))) {//Number.isInteger==>boolean
//         res.status(400).json({ message: 'ID must be an integer' })
//     }else{
//         return await editTutorial(Number(reqId)).then(user => res.json(user))
//         .catch(err => {
//             if (err.status) {
//                 res.status(err.status).json({ message: err.message })
//             } else {
//                 res.status(500).json({ message: err.message })
//             }
//         })
//     }
// }
