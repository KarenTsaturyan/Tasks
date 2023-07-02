import express from "express";
// service(), controller ...  :  CRUD app
///|||                         |npx nodemon ./app.ts|    
import { userRouter } from "./router/user-router";
const app = express();
const authMiddleware = (req:any, res:any, next:any)=>{
        const apiKey = req.get('api-key')
        if(apiKey === '123'){
            next()
        }else {
            res.status(401).send('Invalid Key')
        }
    }

export function bootstrap(){
    app.use(express.json())
    app.use(authMiddleware)
    app.use('/users', userRouter)//all routers start with /user
    app.get('/', (req, res) => {
        res.json({ 
            CreateUser:'users/create/',
            GetUser: 'users/user/:id',
            DeleteUser:'users/delete/:id',
            Update:'users/update/:id',
            Activate:'users/activate/:id'
     })
    })
    const port = process.env.PORT || 3000
    
    app.listen(port, ()=>{
        console.log(`our server on ${port}`);
        
    })

}
bootstrap()