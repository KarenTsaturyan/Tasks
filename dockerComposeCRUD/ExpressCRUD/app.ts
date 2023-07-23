import express from "express";
import pgPromise from "pg-promise";
import {IMain,IDatabase} from 'pg-promise';
 import {AppDataSource} from './data_source/data_source'
import { userRouter } from "./router/user-router";
import { UsersEntity } from "./entities/users.entity";

const app = express();

AppDataSource
.initialize()
    .then(()=>{
        console.log('connected to db successfully')
    })
    .catch((err)=>{
        console.error("Error during Data Source initialization:", err)
    }) 
const authMiddleware = (req:any, res:any, next:any)=>{
        const apiKey = req.get('api-key')
        if(apiKey === '123'){
            next()
        }else {
            res.status(401).send('Invalid Key')
        }
    }

export function bootstrap(){
    // const usersRepository=AppDataSource.getRepository(UsersEntity)

   async function getAllPuppies(req:any, res:any, next:any){
    return res.send('hello')
}
   
    app.use(express.json())
    app.use(authMiddleware)
    app.use('/users', userRouter)//all routers start with /user
    app.get('/',  getAllPuppies)
    const port = process.env.PORT || 3000
    
    app.listen(port, ()=>{
        console.log(`our server on ${port}`);
    })

}
bootstrap()