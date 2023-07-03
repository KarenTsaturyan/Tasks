import fs from 'fs'
import { INewUser } from '../services/user-service'
export const getNewId = (array:INewUser[]) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}
export const newDate = () => new Date().toString()

export function checkElInArr(array:INewUser[], id:number):Promise<INewUser | undefined> {
    return new Promise((resolve, reject) => {
        const row = array.find(el => el.id == id)
        if (!row) {
            reject({
                message: 'Wrong ID',
                status: 404
            })
        }
        resolve(row)
    })
}
export function writeJSONFile(filename:string, content:INewUser[]) {
    fs.writeFile(filename, JSON.stringify(content),(err)=>{
        console.log(err);
    })
}
