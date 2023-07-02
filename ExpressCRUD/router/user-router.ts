import express from 'express'
import { activateUserControl, createUserControl, deleteUserControl, retrieveUserControl, updateUserControl } from '../controller/user-controller';

const userRouter = express.Router();



// userRouter.get('/', (req,res,next)=>)
// retreive a list

userRouter.post('/create/', (req,res,next)=>createUserControl(req,res, next))
//create |
userRouter.delete('/delete/:id', (req,res,next)=>deleteUserControl(req,res, next))
userRouter.get('/user/:id', (req,res,next)=>retrieveUserControl(req,res, next))//get one post
userRouter.put('/update/:id',(req,res,next)=>updateUserControl(req,res, next))//update
userRouter.put('/activate/:id',(req,res,next)=>activateUserControl(req,res,next))
export {userRouter};