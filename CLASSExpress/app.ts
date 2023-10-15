import express from "express";
// service(), controller ...  :  CRUD app
///|||                         |npx nodemon ./app.ts|    
import { userRouter } from "./router/user-router";
const app = express();

export function bootstrap(){
    app.use(express.json())
    app.use('/users', userRouter)
    const port = process.env.PORT || 3000
    
    app.listen(port, ()=>{
        console.log(`our server on ${port}`);
        
    })

}
bootstrap()

// app.use(express.json())

// const loggerMiddleware = (req:any, res:any, next:any) => {
//     const log = req.body;//express.json

//     if(log){
//         next();
//         console.log(`[${new Date()}] ${req.method} ${req.url}`);
//     }else{
//         next(new Error('log is not '))
//     }
//     console.log('I am still in flow');
    
//     next()
// }
// const authMiddleware = (req:any, res:any, next:any)=>{
//     const apiKey = req.get('api-key')
//     if(apiKey === '123'){
//         next()
//     }else {
//         res.status(401).send('Invalid Key')
//     }
// }

// const ErrorHandler=(req, res, err)=>{
//     res.status(500).send({error:err, })
// }
// app.use(authMiddleware)


// app.get('/', (req,res)=>{
//     res.send('Hello from express')
// })
// app.get('/protected', loggerMiddleware,authMiddleware, (req,res)=>{
//     res.send('Protected')
// })

// app.use(ErrorHandler)
// const port = process.env.PORT || 3000
    
//     app.listen(port, ()=>{
//         console.log(`our server on ${port}`);
        
//     })





