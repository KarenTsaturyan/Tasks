import { Request, Response, NextFunction } from "express";
import {userService} from '../services'
import { IUserService } from "../services/user-service";

export class UserController {//can write with functions
    constructor(private userService:IUserService){

    }
    create(req:Request, res:Response, next:NextFunction){
        const userPayload = req.body;
        // if(!userPayload && !userPayload.name){//validation
        //     res.status(400)
        // }
        try{
            const result =  userService.createUser(userPayload);//this.userService.createUser(userPayload);
            res.status(201).send(result)
        }catch(error){
            // console.log();
            next(error)
            res.status(500).send({
                error: error
            })
            
        }
    }
    read(){

    }
    update(){

    }
    delete(){

    }
}

//functions as methods use