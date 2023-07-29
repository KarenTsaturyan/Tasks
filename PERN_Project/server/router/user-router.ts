import express from 'express'
import { addUserControl, retrieveUsersControl } from '../controller/user-controller';

const userRouter = express.Router();



userRouter.post('/addUser/', (req,res,next)=>addUserControl(req,res, next))

userRouter.get('/', (req,res,next)=>retrieveUsersControl(req,res, next))//get one post

export default userRouter