// ex`  user.service.ts
interface IUser {
    id:string;
    name:string;
    age:number;
}

const users= [];

export interface IUserService {
    createUser: (paylaod:Omit<IUser, 'id'>)=>IUser
}

export class UserService implements IUserService {//no response and request
    createUser(userPayload:Omit<IUser, "id"> ){
        const {name, age} = userPayload;
        const user = {
            id:Math.floor(1000*Math.random()).toString(),
            name,
            age,
        }
        users.push(user);
        return user;
    }
}