import express from 'express'
import { userController } from '../controller';

const userRouter = express.Router();

userRouter.post('/', (req,res,next)=>userController.create(req,res, next))

export {userRouter};