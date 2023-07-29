import { AppDataSource } from "../data_source/data_source";
import { UsersEntity } from "../entities/users.entity";
// import { INewUser } from "./tutorial-service";

export interface IReqBodyUser {
    id:number
    name:string
    surname:string
}
const usersRepository = AppDataSource.getRepository(UsersEntity)

export function addUser(payload:IReqBodyUser){
    return new Promise<number>((resolve, reject) => {
        try {
            const user = usersRepository.create({//everytime creates new user
                name:payload.name,
                surname:payload.surname,
            })
            // const results = tutorialRepository.save(tutorial)
            //  results.then(el=>console.log(el))
            const results = usersRepository.save(user);
             results.then(el=>{
                 resolve(el.id)
             })

        } catch (e) {
            reject(e)
        }
    })
}

export function retrieveUsers() {
    return new Promise((resolve, reject) => {
        const user = usersRepository.find({
            order:{
                id:"ASC"
            },
        })
        user
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