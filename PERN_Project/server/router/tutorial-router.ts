import express from 'express'
import { addTutorialControl, retrieveTutorialsControl, deleteTutorialControl, retrieveTutorialControl, updateTutorialControl } from '../controller/tutorial-controller';

const tutorialRouter = express.Router();

tutorialRouter.post('/add/:id', (req,res,next)=>addTutorialControl(req,res, next))
//create |
tutorialRouter.get('/:id', (req,res,next)=>retrieveTutorialsControl(req,res, next))//get one post
tutorialRouter.delete('/delete/:id', (req,res,next)=>deleteTutorialControl(req,res, next))
tutorialRouter.get('/tutorial/:id', (req,res,next)=>retrieveTutorialControl(req,res, next))//get one post
tutorialRouter.put('/update/:id',(req,res,next)=>updateTutorialControl(req,res, next))//update
// tutorialRouter.put('/edit/:id',(req,res,next)=>editTutorialControl(req,res,next))
export default tutorialRouter