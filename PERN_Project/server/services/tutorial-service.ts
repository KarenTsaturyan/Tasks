// import users from '../data/users.json'
import { IReqBody } from '../controller/tutorial-controller'
import { TutorialsEntity } from '../entities/tutorials.entity'
import { AppDataSource } from '../data_source/data_source'
import { UsersEntity } from '../entities/users.entity'
export interface INewUser {
    id:number
    // name:string
    // surname:string
    title:string
    description:string
    // tutorials:INewTutorial[]
}
interface INewTutorial {
    id:number
    title:string
    description:string
}
const tutorialRepository=AppDataSource.getRepository(TutorialsEntity)
const usersRepository = AppDataSource.getRepository(UsersEntity)
//CreateUser
export function addTutorial(payload: IReqBody, userId:number){
    return new Promise<INewUser>((resolve, reject) => {
        try {
            const tutorial = tutorialRepository.create({...payload, user:{id:userId}})
            const results = tutorialRepository.save(tutorial)
             results.then(el=>{
                resolve(el)
            }).catch(err=>console.log(err))
            
        } catch (e) {
            reject(e)
        }
    })
}
//Delete User
export function deleteTutorial(id:number) {
    return new Promise((resolve, reject) => {

        //     usersRepository
        //     .createQueryBuilder('users')
        //     .delete()
        //     .from(UsersEntity)
        //     .where("id = :id", { id: id })
        //     .execute()

        const tutorial = tutorialRepository.delete(id)
        tutorial.then((el)=>{
            if(el.affected){
                resolve("User has been deleted")
            }else{
                reject({message:"User's not found"})
            }
        }).catch(err=>{
            reject(err)
        })
    })
}
export function retrieveTutorial(id:number) {
    return new Promise((resolve, reject) => {
        const user = tutorialRepository.findOneBy({
            id:id
        })
        user
        .then((el)=>{
            if(!!el?.id){
                resolve(el)
            }else{
                reject({message:"User's not found"})
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}
//Update User
export function updateTutorial(id:number, newUser:IReqBody) {
    return new Promise((resolve, reject) => {
        const user = tutorialRepository.findOneBy({
            id: id,
        })
        user
        .then(el=>{
            if(el?.id){
                el.title = newUser.title
                el.description = newUser.description
                const results = tutorialRepository.save(el)
                resolve(results)
            }else{
                    reject({message:"User's not found"})
            }
        })
        .catch(err=>{
            reject(err.message) 
        })
    })
}


export function retrieveTutorials(id:number) {
    return new Promise((resolve, reject) => {
        const tutorials = tutorialRepository.find({
            order: {//id: 'ASC',
                user: {
                    id: 'ASC',
                },
            },
            where:{
                user:{
                    id:id//payload.id
                }
            },
            relations:{
                user:true
            }
      })
        tutorials
        .then((el)=>{
            if(!!el){
                resolve(el)
            }else{
                reject({message:"User's not found"})
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}
//Change status to True
// export function editTutorial(id:number) {
//     return new Promise((resolve, reject) => {
//         // usersRepository.update({
//         //     id: id,
//         // },{
//         //     status: !status,//chi ashxatum
//         // });
//         const user = tutorialRepository.findOneBy({
//             id: id,
//         })
//         user
//         .then(el=>{
//             if(!!el?.id){
//                 el.status = !el.status
//                 const results = tutorialRepository.save(el)
//                 resolve(results)
//             }else{
//                 reject({message:"User's not found"})
//             }

//         })
//         .catch(err=>{
//             reject(err.message) 
//         })
//     })
// }
