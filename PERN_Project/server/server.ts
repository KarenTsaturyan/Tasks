import express from "express";
import cors from 'cors' //(Cross-origin resource sharing)
import tutorialRouter from "./router/tutorial-router";
import { AppDataSource } from "./data_source/data_source";
import userRouter from "./router/user-router";

const app = express()

AppDataSource
.initialize()
    .then(()=>{
        console.log('connected to db successfully')
    })
    .catch((err)=>{
        console.error("Error during Data Source initialization:", err)
    }) 


function bootstrap(){
    app.use(cors())//cross browser connection(port connection)
    app.use(express.json())

    // app.use(authMiddleware)
    app.use('/tutorials', tutorialRouter)//all routers start with /tutorials
    app.use('/users', userRouter)//all routers start with /user

    const port =  process.env.PORT || 3000
    
    app.listen(port, ()=>{
        console.log(`our server on ${port}`);
    })
}

bootstrap()
